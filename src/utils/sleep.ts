export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sleepWithError(ms: number, message: string) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(message), ms)
  );
}
