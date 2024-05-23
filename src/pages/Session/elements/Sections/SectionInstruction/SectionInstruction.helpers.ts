export const humanizeDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0 && remainingSeconds > 0) {
    return `${minutes} minutes ${remainingSeconds} seconds`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${remainingSeconds} seconds`;
  }
};
