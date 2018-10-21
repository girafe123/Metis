function shallowDiff(a, b) {
  const result = [];
  Object.keys(a).forEach((key) => {
    if (a[key] !== b[key]) {
      result.push({ key, a, b });
    }
  });

  console.log(result);
  console.table(result);
}

export {
  shallowDiff,
}
