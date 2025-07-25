// settingHandler.ts

import { get, set } from '../managers/storageManager';

// Design Settings
export interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export const DesignDefault: DesignSettings = {
  slotGap: 4,
  rowGap: 16,
  backgroundPadding: 24,
  pillarWidth: 10,
};

export async function loadDesignSettings(): Promise<DesignSettings> {
  const slotGap = await get('slotGap', DesignDefault.slotGap);
  const rowGap = await get('rowGap', DesignDefault.rowGap);
  const backgroundPadding = await get('backgroundPadding', DesignDefault.backgroundPadding);
  const pillarWidth = await get('pillarWidth', DesignDefault.pillarWidth);
  figma.ui.postMessage({ type: 'design-settings-loaded', ...{ slotGap, rowGap, backgroundPadding, pillarWidth } });

  return { slotGap, rowGap, backgroundPadding, pillarWidth };
}

export async function saveDesignSettings(msg: DesignSettings) {
  await set('slotGap', msg.slotGap);
  await set('rowGap', msg.rowGap);
  await set('backgroundPadding', msg.backgroundPadding);
  await set('pillarWidth', msg.pillarWidth);
}

// Develop Settings
export interface DevelopSettings {
  major: number;
}

export const DevelopDefault: DevelopSettings = {
  major: 100,
};

export async function loadDevelopSettings(): Promise<DevelopSettings> {
  const major = await get('major', DevelopDefault.major);
  figma.ui.postMessage({ type: 'develop-settings-loaded', ...{ major } });

  return { major };
}

export async function saveDevelopSettings(msg: DevelopSettings) {
  await set('major', msg.major);
}
