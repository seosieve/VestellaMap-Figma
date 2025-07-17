// clientStorageManager.ts

export async function get(name: string, defaultValue: number) {
  const value = (await figma.clientStorage.getAsync(name)) || defaultValue;
  return value;
}

export async function set(name: string, value: number) {
  await figma.clientStorage.setAsync(name, value);
}
