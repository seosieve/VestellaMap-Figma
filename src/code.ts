/// <reference types="@figma/plugin-typings" />

import { countSlots } from './utils/slotCounter';
import { generateSlots } from './utils/slotGenerator';
import { generateRoutes } from './utils/routeGenerator';
import { saveSettings, loadSettings } from './utils/settingManager';

figma.showUI(__html__, { width: 344, height: 612 });

// 노드 선택 시
figma.on('selectionchange', () => {
  countSlots();
});

// 메시지 수신 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-slots') {
    await generateSlots(msg);
  } else if (msg.type === 'generate-routes') {
    generateRoutes(msg);
  } else if (msg.type === 'reset-settings') {
    await saveSettings(msg);
    figma.notify('🌿 설정이 초기화되었습니다.');
  } else if (msg.type === 'save-settings') {
    await saveSettings(msg);
    figma.notify('🌿 설정이 저장되었습니다.');
  } else if (msg.type === 'load-settings') {
    const settings = await loadSettings();
    figma.ui.postMessage({ type: 'settings-loaded', ...settings });
  }
};

// 플러그인 종료 시
figma.on('close', () => {
  figma.notify('Bye bye! 👋');
});
