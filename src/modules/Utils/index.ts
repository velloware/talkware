export const log = (message: string | any) => {
  if (process.argv.includes('--verbose')) {
    log(message);
  }
};