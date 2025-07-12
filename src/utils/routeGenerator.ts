// routeGenerator.ts

export function generateRoutes() {
    // 선택된 선분에 랜덤 위치에 원 그리기
    const selection = figma.currentPage.selection
    
    if (selection.length > 0) {
      const selectedNode = selection[0]
      
      if (selectedNode?.type === 'LINE') {
        const line = selectedNode as LineNode
        
        // 선분의 실제 시작점과 끝점 파악
        // Line의 경우 실제로는 vector 속성을 사용해야 할 수도 있음
        console.log('Line 정보:', {
          x: line.x,
          y: line.y,
          width: line.width,
          height: line.height,
          rotation: line.rotation
        })
        
        // Line의 실제 끝점 계산 (rotation과 width 사용)
        const startPoint = { x: line.x, y: line.y }
        
        // rotation을 라디안으로 변환 (반대 방향으로)
        const rotationRad = -line.rotation * Math.PI / 180
        
        // rotation과 width를 사용해서 끝점 계산
        const endPoint = {
          x: startPoint.x + line.width * Math.cos(rotationRad),
          y: startPoint.y + line.width * Math.sin(rotationRad)
        }
        
        // 선분 위의 랜덤한 위치 계산
        const randomRatio = Math.random()
        const circleCenter = {
          x: startPoint.x + (endPoint.x - startPoint.x) * randomRatio,
          y: startPoint.y + (endPoint.y - startPoint.y) * randomRatio
        }
        
        console.log('선분 정보:', {
          startPoint,
          endPoint,
          rotation: line.rotation,
          width: line.width,
          circleCenter
        })
        
        // 원 생성 (중점 기준)
        const circle = figma.createEllipse()
        const diameter = 200 // 원 지름
        circle.resize(diameter, diameter)
        
        // 원의 중점을 계산된 위치에 배치
        circle.x = circleCenter.x - diameter / 2
        circle.y = circleCenter.y - diameter / 2
        
        circle.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }]
        circle.name = `Circle on Line`
        
        figma.currentPage.appendChild(circle)
        figma.currentPage.selection = [circle]
        
        figma.notify(`원 생성: 중점(${circleCenter.x.toFixed(1)}, ${circleCenter.y.toFixed(1)})`)
      } else {
        figma.notify('선분을 선택해주세요')
      }
    } else {
      figma.notify('선분을 선택해주세요')
    }
}