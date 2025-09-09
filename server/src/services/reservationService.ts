// [서비스]
// TODO: 비즈니스 로직을 구현하세요.
// - 좌석 가용성 검사, 중복예약 방지(동시성 제어)
// - 홀드(임시점유) 생성과 만료(예: 2~5분 타임아웃)
// - 예약 생성/취소 트랜잭션(원자성 보장)
// - 도메인 규칙: 예) 같은 유저는 동일 타임슬롯 중복 예약 불가

// 구현 아이디어:
// - 저장소 레이어(reservationRepository) 를 통해 상태를 읽고/쓰기
// - 인메모리 구현으로 시작 후 DB로 교체 가능하게 인터페이스 분리
// - 동시성: 좌석 단위 락(맵) 또는 큐잉, 낙관적락 버전필드 등

// export class ReservationService {
//   constructor(private repo: ReservationRepository) {}
//   async holdSeats(...) {}
//   async createReservation(...) {}
//   async cancelReservation(...) {}
//   async listReservations(...) {}
//   async listSeats(...) {}
// }

