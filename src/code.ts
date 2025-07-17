/// <reference types="@figma/plugin-typings" />

import { countSlots } from './utils/slotCounter';
import { generateSlots } from './utils/slotGenerator';
import { generateRoutes } from './utils/routeGenerator';
import { saveSettings, loadSettings } from './utils/settingManager';

figma.showUI(__html__, { width: 344, height: 612 });

// 플러그인 실행 시
figma.on('run', () => {
  figma.notify('Hello! 👋');
});

figma.on('selectionchange', () => {
  countSlots();
});

// Show UI 후 메시지 수신 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-slots') {
    generateSlots(msg);
  } else if (msg.type === 'generate-routes') {
    generateRoutes();
  } else if (msg.type === 'save-settings') {
    await saveSettings(msg);
  } else if (msg.type === 'load-settings') {
    const settings = await loadSettings();
    figma.ui.postMessage({ type: 'settings-loaded', settings });
  }
};

// 플러그인 종료 시
figma.on('close', () => {
  figma.notify('Bye bye! 👋');
});
