/// <reference types="@figma/plugin-typings" />

import { countSlots } from './utils/slotCounter';
import { generateSlots } from './utils/slotGenerator';
import { generateRoutes } from './utils/routeGenerator';

figma.showUI(__html__, { width: 344, height: 612 });

figma.on('selectionchange', () => {
  countSlots();
});

// Show UI 후 메시지 수신 처리
figma.ui.onmessage = (msg: { type: string; count: number; pillar: number; multiple: boolean }) => {
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
