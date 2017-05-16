export const animateScrollTo = (el, val) => {
  let cval = el.scrollTop;
  let dval = val - cval;
  const f = 30;
  const run = () => {
    dval /= 2
    if (Math.abs(dval) > 1) {
      cval += dval;
      el.scrollTop = cval;
      window.setTimeout(run, f);
    }
  }
  run();
}