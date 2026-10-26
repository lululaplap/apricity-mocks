// Accessibility audit: axe-core (WCAG 2.0-2.2 A/AA + best practice) plus measured text size, weight, contrast and tap-target size.
// usage: node audit.js <url> <label> [view ...]   views = data-view names to open on the new menu (home drinks wine alacarte tasting)
// SCALE=<n> multiplies measured sizes, for pages shown scaled on a phone (the Wix mobile site is laid out at 320px and scaled up).
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const metrics = (SCALE) => {
  const parse = c => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : [0,0,0,0]; };
  const lum = ([r,g,b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b); };
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length < 4 || c[3] > 0.9) { if (c.length >= 3 && !(c.length === 4 && c[3] === 0)) return c.slice(0,3); } } return [255,255,255]; };
  const scale = SCALE || window.top.innerWidth / document.documentElement.clientWidth || 1;
  const out = { text: [], targets: [] };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const n = walker.currentNode, el = n.parentElement, t = n.textContent.trim();
    if (!t || !el || seen.has(el)) continue;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (r.width === 0 || r.height === 0 || cs.visibility === 'hidden' || cs.display === 'none' || el.closest('[hidden],[aria-hidden="true"],script,style,noscript')) continue;
    if (cs.position === 'absolute' && cs.clip && cs.clip !== 'auto') continue;
    seen.add(el);
    const fg = parse(cs.color).slice(0,3), bg = bgOf(el), L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1,L2) + 0.05) / (Math.min(L1,L2) + 0.05);
    out.text.push({ t: t.slice(0, 40), chars: t.length, px: parseFloat(cs.fontSize) * scale, w: +cs.fontWeight, ratio: Math.round(ratio * 100) / 100 });
  }
  document.querySelectorAll('a[href], button, [role=button], [role=tab], input, select, summary').forEach(el => {
    const r = el.getBoundingClientRect(); if (!r.width || el.closest('[hidden]')) return;
    out.targets.push({ t: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(r.width * scale), h: Math.round(r.height * scale) });
  });
  return out;
};
(async () => {
  const [url, label, ...views] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: Number(process.env.WIDTH) || 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort());
  const p = await ctx.newPage();
  await p.goto(url); await p.waitForTimeout(1200);
  const steps = views.length ? views : [null];
  const report = [];
  for (const v of steps) {
    if (v && v !== 'home') { await p.evaluate(v => { const b = document.querySelector(`[data-view="${v}"]`); b && b.click(); }, v); await p.waitForTimeout(600); }
    const all = { text: [], targets: [] };
    for (const f of p.frames()) { try { await f.addScriptTag({ content: AXE }); } catch (e) {} try { const m = await f.evaluate(metrics, Number(process.env.SCALE) || 0); all.text.push(...m.text); all.targets.push(...m.targets); } catch (e) {} }
    const axe = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'], iframes: true }); return r.violations.map(x => ({ id: x.id, impact: x.impact, n: x.nodes.length, help: x.help, eg: x.nodes.slice(0, 2).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join(' ')) })); });
    const chars = all.text.reduce((a, x) => a + x.chars, 0);
    const pct = f => Math.round(100 * all.text.filter(f).reduce((a, x) => a + x.chars, 0) / chars);
    const sizes = all.text.map(x => x.px);
    report.push({ view: v || label, textItems: all.text.length, minPx: Math.min(...sizes).toFixed(1), medianPx: sizes.sort((a, b) => a - b)[Math.floor(sizes.length / 2)].toFixed(1),
      pctCharsUnder14px: pct(x => x.px < 14), pctCharsUnder16px: pct(x => x.px < 16), pctCharsWeightUnder400: pct(x => x.w < 400),
      pctCharsContrastUnder4_5: pct(x => x.ratio < 4.5), minContrast: Math.min(...all.text.map(x => x.ratio)),
      targets: all.targets.length, targetsUnder24: all.targets.filter(x => Math.min(x.w, x.h) < 24).length, targetsUnder44: all.targets.filter(x => Math.min(x.w, x.h) < 44).length,
      smallTargetsEg: all.targets.filter(x => Math.min(x.w, x.h) < 44).slice(0, 6).map(x => `${x.t}:${x.w}x${x.h}`),
      lowContrastEg: all.text.filter(x => x.ratio < 4.5).slice(0, 4).map(x => `${x.t}:${x.ratio}@${x.px.toFixed(1)}px`),
      axe });
  }
  console.log(JSON.stringify(report, null, 1));
  await b.close();
})();
