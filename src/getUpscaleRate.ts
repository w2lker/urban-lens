const getUpscaledRate = (report: Record<string, number>, reverse = false) => {
  const lowest = Math.min(...Object.values(report));
  const highest = Math.max(...Object.values(report));
  const rate = {};
  Object.entries(report).forEach(([key, value]) => {
    // @ts-ignore
    rate[key] = reverse ? 1 - (value - lowest) / (highest - lowest) : (value - lowest) / (highest - lowest);
  });

  return rate;
};

export default getUpscaledRate;
