// excelExporter.ts
import { showNotification } from '../managers/notificationManager';

export function exportCSV() {
  const csvContent = 'Beacon Number,X,Y\n'; // CSV 헤더

  // UI 쪽으로 CSV 데이터 전송
  figma.ui.postMessage({
    type: 'test',
    csvContent: csvContent,
  });

  // showNotification('CSV 파일 다운로드가 시작되었습니다.');
}
