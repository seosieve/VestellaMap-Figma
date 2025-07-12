(function() {
  "use strict";
  function generateSlots(msg) {
    const count = msg.count;
    const pillar = msg.pillar;
    const currentSelection = figma.currentPage.selection;
    if (currentSelection.length === 0) {
      figma.notify("❎ㅤ복사할 노드를 선택해주세요");
      return;
    }
    if (count === 0) {
      figma.notify("❎ㅤ슬롯 개수를 입력해주세요");
      return;
    }
    const selectedNode = currentSelection[0];
    if (!selectedNode || !selectedNode.parent) {
      figma.notify("선택된 노드가 유효하지 않습니다. 다시 선택해주세요.");
      return;
    }
    const nodes = [];
    try {
      for (let i = 0; i < count; i++) {
        if (pillar > 0 && i % pillar === 0) {
          const pillarRect = figma.createRectangle();
          pillarRect.name = `pillar`;
          pillarRect.resize(28, 128);
          pillarRect.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
          figma.currentPage.appendChild(pillarRect);
          nodes.push(pillarRect);
        }
        const copiedNode = selectedNode.clone();
        figma.currentPage.appendChild(copiedNode);
        nodes.push(copiedNode);
      }
      const group = figma.group(nodes, figma.currentPage);
      group.name = `Group`;
      if (group.type === "GROUP") {
        const frame = figma.createFrame();
        frame.name = group.name;
        const children = [...group.children];
        children.forEach((child) => {
          frame.appendChild(child);
        });
        frame.layoutMode = "HORIZONTAL";
        frame.itemSpacing = 16;
        frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 16;
        frame.primaryAxisSizingMode = "AUTO";
        frame.counterAxisSizingMode = "AUTO";
        frame.fills = [{ type: "SOLID", color: { r: 0.33, g: 0.33, b: 0.33 } }];
        frame.cornerRadius = 12;
        const viewportCenter = figma.viewport.center;
        frame.x = viewportCenter.x - frame.width / 2;
        frame.y = viewportCenter.y - frame.height / 2;
        figma.currentPage.selection = [frame];
      }
    } catch (error) {
      figma.notify("노드 복사 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  }
  const selection = figma.currentPage.selection;
  figma.showUI(__html__, { width: 340, height: 540 });
  if (selection.length > 0) {
    const selectedNode = selection[0];
    if ((selectedNode == null ? void 0 : selectedNode.type) === "LINE") {
      const line = selectedNode;
      const startPoint = {
        x: line.x,
        y: line.y
      };
      const endPoint = {
        x: line.x + line.width,
        y: line.y + line.height
      };
      console.log("선분 시작점:", startPoint);
      console.log("선분 끝점:", endPoint);
      figma.notify(`선분: 시작(${startPoint.x}, ${startPoint.y}) → 끝(${endPoint.x}, ${endPoint.y})`);
    }
  }
  figma.on("selectionchange", () => {
    const selection2 = figma.currentPage.selection;
    function countLotsRecursively(node) {
      let count = 0;
      if (node.name.includes("lot")) {
        count++;
      }
      if ("children" in node) {
        for (const child of node.children) {
          count += countLotsRecursively(child);
        }
      }
      return count;
    }
    const nodeInfo = selection2.map((node) => ({
      name: node.name,
      lotCount: countLotsRecursively(node)
    }));
    let totalLots = 0;
    nodeInfo.forEach((info) => {
      totalLots += info.lotCount;
    });
    figma.ui.postMessage({
      type: "selection-updated",
      selectionCount: selection2.length,
      lotCount: totalLots,
      nodeInfo
    });
  });
  figma.ui.onmessage = (msg) => {
    if (msg.type === "generate-slots") {
      generateSlots(msg);
    } else if (msg.type === "create-random-circle") {
      const selection2 = figma.currentPage.selection;
      if (selection2.length > 0) {
        const selectedNode = selection2[0];
        if ((selectedNode == null ? void 0 : selectedNode.type) === "LINE") {
          const line = selectedNode;
          console.log("Line 정보:", {
            x: line.x,
            y: line.y,
            width: line.width,
            height: line.height,
            rotation: line.rotation
          });
          const startPoint = { x: line.x, y: line.y };
          const rotationRad = -line.rotation * Math.PI / 180;
          const endPoint = {
            x: startPoint.x + line.width * Math.cos(rotationRad),
            y: startPoint.y + line.width * Math.sin(rotationRad)
          };
          const randomRatio = Math.random();
          const circleCenter = {
            x: startPoint.x + (endPoint.x - startPoint.x) * randomRatio,
            y: startPoint.y + (endPoint.y - startPoint.y) * randomRatio
          };
          console.log("선분 정보:", {
            startPoint,
            endPoint,
            rotation: line.rotation,
            width: line.width,
            circleCenter
          });
          const circle = figma.createEllipse();
          const diameter = 200;
          circle.resize(diameter, diameter);
          circle.x = circleCenter.x - diameter / 2;
          circle.y = circleCenter.y - diameter / 2;
          circle.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
          circle.name = `Circle on Line`;
          figma.currentPage.appendChild(circle);
          figma.currentPage.selection = [circle];
          figma.notify(`원 생성: 중점(${circleCenter.x.toFixed(1)}, ${circleCenter.y.toFixed(1)})`);
        } else {
          figma.notify("선분을 선택해주세요");
        }
      } else {
        figma.notify("선분을 선택해주세요");
      }
    }
  };
})();
