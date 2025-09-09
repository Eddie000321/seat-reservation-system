// [저장소]
// TODO: 데이터 접근을 추상화하세요. 처음엔 인메모리로 시작하세요.
// 이후 DB로 교체하기 쉬운 인터페이스 형태로 구성합니다.
// - findReservations(filter)
// - findReservationById(id)
// - createReservation(entity)
// - deleteReservation(id)
// - listSeats(showId)
// - holdSeats(seatIds, userId, ttlMs)
// - releaseHolds(expiredOnly?)

// 인메모리 스키마 아이디어(자유롭게 변경):
// - seats: Map<seatId, { id, label, status, holdUntil?, reservationId? }>
// - reservations: Map<id, { id, userId, seatIds, showId, createdAt }>
// - holds: Map<seatId, { seatId, userId, until }>

