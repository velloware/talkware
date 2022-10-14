export const log = (message: string | any) => {
  if (process.argv.includes('--logs-debug')) {
    console.log(message);
  }
};