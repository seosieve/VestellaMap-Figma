// settingManager.ts

import { get, set } from './managers/clientStorageManager';

interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export async function loadSettings(): Promise<DesignSettings> {
  const slotGap = await get('slotGap', 16);
  const rowGap = await get('rowGap', 16);
  const backgroundPadding = await get('backgroundPadding', 16);
  const pillarWidth = await get('pillarWidth', 28);
  return { slotGap, rowGap, backgroundPadding, pillarWidth };
}

export async function saveSettings(msg: any) {
  await set('slotGap', msg.slotGap);
  await set('rowGap', msg.rowGap);
  await set('backgroundPadding', msg.backgroundPadding);
  await set('pillarWidth', msg.pillarWidth);
}
