// Create function to create hash

export function createHash(data: string): string {

  let limitLength = 5;
  const dataNow = `${data}${new Date().getMilliseconds()}`;
  const max = (2 << 32);
  let hash = '';

  for (let i = 0; i < limitLength; i++) {
    const index = Math.floor(Math.random() * max);

    if (dataNow[index].match(/\w/i)) {
      hash += dataNow[index];
    } else {
      limitLength++;
    }

  }

  return hash;
}