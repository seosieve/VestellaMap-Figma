// settingManager.ts

export async function get(name: string, defaultValue: number) {
  const value = (await figma.clientStorage.getAsync(name)) || defaultValue;
  return value;
}

export async function set(name: string, value: number) {
  await figma.clientStorage.setAsync(name, value);
}

export interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export const DEFAULT_SETTINGS: DesignSettings = {
  slotGap: 16,
  rowGap: 16,
  backgroundPadding: 16,
  pillarWidth: 28,
};

export async function loadSettings(): Promise<DesignSettings> {
  const slotGap = await get('slotGap', DEFAULT_SETTINGS.slotGap);
  const rowGap = await get('rowGap', DEFAULT_SETTINGS.rowGap);
  const backgroundPadding = await get('backgroundPadding', DEFAULT_SETTINGS.backgroundPadding);
  const pillarWidth = await get('pillarWidth', DEFAULT_SETTINGS.pillarWidth);
  return { slotGap, rowGap, backgroundPadding, pillarWidth };
}

export async function saveSettings(msg: DesignSettings) {
  await set('slotGap', msg.slotGap);
  await set('rowGap', msg.rowGap);
  await set('backgroundPadding', msg.backgroundPadding);
  await set('pillarWidth', msg.pillarWidth);
}
