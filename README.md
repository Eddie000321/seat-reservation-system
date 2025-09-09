# Seat Reservation System (Skeleton)

이 저장소는 좌석 예약 시스템을 직접 구현해보도록 설계된 최소 골격입니다.
모든 구현 가이드는 각 파일의 주석(TODO)에 숨겨져 있습니다. 주석을 따라가며 스스로 코드를 작성해보세요.

## 구조
- server: Node/Express 백엔드 (TypeScript)
- web: React 프론트엔드 (Vite + TypeScript)

## 시작하기
1) `.env.example`를 복사해 `.env`를 만듭니다.
2) 패키지 매니저 선택 후 의존성 설치(pnpm/npm/yarn). 예: `pnpm -w i`
3) 서버/웹 개발 서버 실행: 루트에서 `pnpm dev` (스クリپ트 참고)

세부 구현은 아래 파일들 주석을 먼저 확인하세요.
- 서버 엔트리: `server/src/server.ts`
- 앱 구성: `server/src/app.ts`
- 라우터: `server/src/routes/reservations.ts`
- 서비스: `server/src/services/reservationService.ts`
- 저장소: `server/src/repositories/reservationRepository.ts`
- 웹 엔트리: `web/src/main.tsx`
- 최상위 컴포넌트: `web/src/App.tsx`
- 좌석맵: `web/src/components/SeatMap.tsx`
- 예약폼: `web/src/components/ReservationForm.tsx`
- API 클라이언트: `web/src/api/client.ts`

