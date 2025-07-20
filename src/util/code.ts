/// <reference types="@figma/plugin-typings" />

import { countSlots } from './services/slotCounter';
import { countBeacons } from './services/beaconCounter';
import { detectLine } from './services/lineDetector';
import { generateSlots } from './services/slotGenerator';
import { notifyEmpty, generateRoutes } from './services/routeGenerator';
import { showPreviewEllipse, hidePreviewEllipse } from './services/previewGenerator';
import { saveSettings, loadSettings } from './services/settingManager';
import { showNotification } from './managers/notificationManager';

figma.showUI(__html__, { width: 344, height: 612 });

// 노드 선택 시
figma.on('selectionchange', () => {
  countSlots();
  countBeacons();
  detectLine();
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
