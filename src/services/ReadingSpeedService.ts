function calculateReadingSpeed(
  startTime: number, // Milliseconds as returned by Date.now()
  endTime: number,
  paragraphWordCount: number,
  allTimeWordCount: number,
  allTimeReadingDuration: number
): number {
  let duration = (allTimeReadingDuration + endTime - startTime) / 1000;
  let totalWordCount = allTimeWordCount + paragraphWordCount;

  return totalWordCount / duration; // WPS
}
