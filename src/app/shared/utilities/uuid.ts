
export const uuid = (): string => {
  const timestamp = getHex(Date.now() / 1000);
  const random = ' '.repeat(16).replace(/./g, () => getHex(Math.random() * 16));
  return `${timestamp}${random}`;
}

export const getHex = (value: number) => Math.floor(value).toString(16);
