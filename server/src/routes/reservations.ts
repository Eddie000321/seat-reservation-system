// [예약 라우터]
// TODO: 아래 REST 엔드포인트를 가진 Express Router 를 구현하세요.
// - GET    /reservations           : 예약 목록 조회(필터: 공연/상영/일자 옵션)
// - POST   /reservations           : 좌석 예약 생성(동시성 고려)
// - GET    /reservations/:id       : 예약 단건 조회
// - DELETE /reservations/:id       : 예약 취소
// - GET    /seats                  : 좌석 맵/가용 좌석 조회
// - POST   /holds                  : 좌석 홀드(임시 점유)

// 라우트 내부에서는 컨트롤러 함수를 호출만 하도록 분리하세요.
// - import * as ctrl from "../controllers/reservationController"
// - router.get("/reservations", ctrl.list)

// 동시성/중복 예약 방어는 service 레이어에서 처리하도록 위임합니다.

// export const reservationsRouter = Router()

