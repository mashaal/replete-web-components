const raw = (a, s) => {
  const c = new String(a);
  return (c.isEscaped = !0), (c.callbacks = s), c;
};

export { raw };
