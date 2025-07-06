# Vestella Map - Figma Plugin

Figma 플러그인으로 선택된 노드를 복사하고 pillar를 자동으로 배치하는 도구입니다.

## 기능

- 선택된 노드 복사 및 반복 생성
- pillar 간격으로 자동 Rectangle 배치
- Auto Layout을 적용한 Frame 생성
- 실시간 lot 개수 감지 및 표시

## 사용법

1. Figma에서 복사할 노드를 선택
2. 플러그인 실행
3. 생성할 개수와 pillar 간격 설정
4. 생성 버튼 클릭

## 개발

```bash
npm install
npm run build
```

## 파일 구조

- `code.ts` - 메인 플러그인 로직
- `ui.html` - UI 인터페이스
- `manifest.json` - 플러그인 설정
