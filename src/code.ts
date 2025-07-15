/// <reference types="@figma/plugin-typings" />

import { selectSlots } from './utils/slotSelector';
import { generateSlots } from './utils/slotGenerator';
import { generateRoutes } from './utils/routeGenerator';

figma.showUI(__html__, { width: 340, height: 600 });

figma.on('selectionchange', () => {
  selectSlots();
});

// Show UI 후 메시지 수신 처리
figma.ui.onmessage = (msg: { type: string; count: number; pillar: number }) => {
  if (msg.type === 'generate-slots') {
    generateSlots(msg);
  } else if (msg.type === 'generate-routes') {
    generateRoutes();
  }
};

// 플러그인이 종료될 때 실행될 함수
figma.on('close', () => {
  figma.notify('Bye bye! 👋');
});
