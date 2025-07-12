/// <reference types="@figma/plugin-typings" />

import { generateSlots } from './utils/slotGenerator'
import { generateRoutes } from './utils/routeGenerator'

figma.showUI(__html__, { width: 340, height: 540 })

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection
  
  // 재귀적으로 lot 개수를 세는 함수
  function countLotsRecursively(node: SceneNode): number {
    let count = 0
    
    // 현재 노드가 lot을 포함하는지 확인
    if (node.name.includes('lot')) {
      count++
    }
    
    // 자식 노드들이 있으면 재귀적으로 탐색
    if ('children' in node) {
      for (const child of node.children) {
        count += countLotsRecursively(child)
      }
    }
    
    return count
  }

  // 각 선택된 노드의 정보를 배열로 수집
  const nodeInfo = selection.map(node => ({
    name: node.name,
    lotCount: countLotsRecursively(node)
  }))
  
  let totalLots = 0
  nodeInfo.forEach(info => {
    totalLots += info.lotCount
  })
  
  figma.ui.postMessage({
    type: 'selection-updated',
    selectionCount: selection.length,
    lotCount: totalLots,
    nodeInfo: nodeInfo
  })
})

// Show UI 후 메시지 수신 처리
figma.ui.onmessage = (msg: {type: string, count: number, pillar: number}) => {
  if (msg.type === 'generate-slots') {
    generateSlots(msg)
  } else if (msg.type === 'generate-routes') {
    generateRoutes()
  }
}

// 플러그인이 종료될 때 실행될 함수
figma.on('close', () => {
  figma.notify('Bye bye! 👋')
})
