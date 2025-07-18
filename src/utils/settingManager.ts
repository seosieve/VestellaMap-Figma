// settingManager.ts

export interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export const DefaultValue: DesignSettings = {
  slotGap: 16,
  rowGap: 16,
  backgroundPadding: 16,
  pillarWidth: 28,
};

export async function get(name: string, defaultValue: number) {
  const value = (await figma.clientStorage.getAsync(name)) || defaultValue;
  return value;
}

export async function set(name: string, value: number) {
  await figma.clientStorage.setAsync(name, value);
}

export async function loadSettings(): Promise<DesignSettings> {
  const slotGap = await get('slotGap', DefaultValue.slotGap);
  const rowGap = await get('rowGap', DefaultValue.rowGap);
  const backgroundPadding = await get('backgroundPadding', DefaultValue.backgroundPadding);
  const pillarWidth = await get('pillarWidth', DefaultValue.pillarWidth);
  return { slotGap, rowGap, backgroundPadding, pillarWidth };
}

export async function saveSettings(msg: DesignSettings) {
  await set('slotGap', msg.slotGap);
  await set('rowGap', msg.rowGap);
  await set('backgroundPadding', msg.backgroundPadding);
  await set('pillarWidth', msg.pillarWidth);
}
