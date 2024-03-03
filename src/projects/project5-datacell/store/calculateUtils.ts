export function getHistogram(data: number[]) {
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  const binCount = 12;
  const binWidth = (maxValue - minValue) / binCount;

  const bins = [...new Array(binCount + 1)].map((_, index) => {
    return Number(Math.min(maxValue, minValue + index * binWidth).toFixed(2));
  });

  const counts: number[] = [...new Array(binCount)].map((_) => {
    return 0;
  });

  data.forEach((v) => {
    let check = true;
    bins.forEach((bin, index) => {
      if (check && v <= bin) {
        counts[index - 1] += 1;
        check = false;
      }
    });
  });
  return {
    bins: bins,
    counts: counts,
  };
}
