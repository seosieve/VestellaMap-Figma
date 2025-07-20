// settingManager.ts

import { get, set } from '../managers/storageManager';

export interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export const DefaultValue: DesignSettings = {
  slotGap: 4,
  rowGap: 16,
  backgroundPadding: 24,
  pillarWidth: 10,
};

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
