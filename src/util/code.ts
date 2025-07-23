/// <reference types="@figma/plugin-typings" />

import { selectSlots } from './services/selector/slotSelector';
import { numberBeacons } from './services/beaconNumberer';
import { exportCSV } from './services/excelExporter';
import { selectBeacons } from './services/selector/beaconSelector';
import { selectLine } from './services/selector/lineSelector';
import { generateSlots } from './services/slotGenerator';
import { notifyEmpty, generateRoutes } from './services/routeGenerator';
import { showPreviewEllipse, hidePreviewEllipse } from './services/previewGenerator';
import { saveSettings, loadSettings } from './services/settingHandler';
import { showNotification } from './managers/notificationManager';

figma.showUI(__html__, { width: 344, height: 612 });

// 노드 선택 시
figma.on('selectionchange', () => {
  selectSlots();
  selectBeacons();
  selectLine();
});

// 메시지 수신 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'empty-lines') {
    notifyEmpty();
  } else if (msg.type === 'generate-slots') {
    await generateSlots(msg);
  } else if (msg.type === 'show-preview-ellipse') {
    showPreviewEllipse(msg);
  } else if (msg.type === 'hide-preview-ellipse') {
    hidePreviewEllipse();
  } else if (msg.type === 'generate-routes') {
    generateRoutes(msg);
  } else if (msg.type === 'numbering-beacons') {
    await numberBeacons();
  } else if (msg.type === 'export-csv') {
    exportCSV();
  } else if (msg.type === 'reset-settings') {
    await saveSettings(msg);
    showNotification('🌿 설정이 초기화되었습니다.');
  } else if (msg.type === 'save-settings') {
    await saveSettings(msg);
    showNotification('🌿 설정이 저장되었습니다.');
  } else if (msg.type === 'load-settings') {
    const settings = await loadSettings();
    figma.ui.postMessage({ type: 'settings-loaded', ...settings });
  }
};

// 플러그인 종료 시
figma.on('close', () => {
  showNotification('Bye bye! 👋');
});
