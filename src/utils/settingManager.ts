interface DesignSettings {
  slotGap: number;
  rowGap: number;
  backgroundPadding: number;
  pillarWidth: number;
}

export async function saveSettings(settings: DesignSettings) {
  await figma.clientStorage.setAsync('designSettings', settings);
}

export async function loadSettings(): Promise<DesignSettings> {
  const settings = await figma.clientStorage.getAsync('designSettings');
  return (
    settings || {
      slotGap: 16,
      rowGap: 16,
      backgroundPadding: 16,
      pillarWidth: 28,
    }
  );
}
