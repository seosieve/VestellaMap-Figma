/// <reference types="@figma/plugin-typings" />

import { countSlots } from './services/slotCounter';
import { detectLine } from './services/lineDetector';
import { generateSlots } from './services/slotGenerator';
import { generateRoutes } from './services/routeGenerator';
import { showPreviewEllipse, hidePreviewEllipse } from './services/previewGenerator';
import { saveSettings, loadSettings } from './services/settingManager';

figma.showUI(__html__, { width: 344, height: 612 });

// 노드 선택 시
figma.on('selectionchange', () => {
  countSlots();
  detectLine();
});

// 메시지 수신 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'empty-lines') {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('❎ 선분을 선택해주세요');
    }
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
