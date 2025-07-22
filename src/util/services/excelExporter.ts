// excelExporter.ts
import { showNotification } from '../managers/notificationManager';

export async function exportCSV() {
  showNotification('Exporting CSV...');
  const csvContent = 'Beacon Number,X,Y\n'; // CSV 헤더

  // Uint8Array로 변환
  const bytes = new TextEncoder().encode(csvContent);

  // 파일 다운로드
  figma.ui.postMessage({
    type: 'DOWNLOAD_CSV',
    file: Array.from(bytes),
    fileName: 'beacon_locations.csv',
  });
}
