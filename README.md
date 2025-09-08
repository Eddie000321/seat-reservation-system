# 🎟️ Seat Reservation & Membership System (FK‑Free Edition)

A backend project that explores seat reservation, membership tiers, and coupon‑based pricing — implemented without foreign keys (FKs) to mimic real‑world, large‑scale system design.

Most student projects use strict FK constraints for safety. Here, FKs are intentionally omitted to reflect how many production systems handle integrity at the application level instead of the database.

> 한국어 요약: 학습/포트폴리오 목적의 좌석 예약 + 멤버십 + 쿠폰 시스템입니다. 실제 대규모 시스템처럼 DB FK를 쓰지 않고 애플리케이션 레이어에서 정합성을 관리하는 실험을 담았습니다.

---

## 🚀 Features

- Seat Reservation
  - Members vs Non‑members
  - Prevents double‑booking with transaction locks
  - Reservation history with applied price
- Membership System
  - Active vs Dormant users
  - Tiered grades (e.g., Silver / Gold / Platinum)
  - Tier recalculation every month at 00:00
- Coupons & Pricing
  - Discounts tied to membership grade
  - Non‑members pay standard price
  - Automatic coupon application
- No Foreign Keys
  - Tables do not enforce referential integrity
  - All checks (e.g., `user_id` validity) are handled in the application layer
  - Example:
    ```js
    const user = await db.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (!user?.rowCount) throw new Error("Invalid user_id");
    ```

---

## 🗄️ Database Schema (FK‑Free)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  grade TEXT DEFAULT 'Basic',
  total_spent DECIMAL DEFAULT 0,
  total_reservations INT DEFAULT 0,
  last_active TIMESTAMP
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  seat_number TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'available' -- available | held | reserved
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,   -- FK omitted
  seat_id INT NOT NULL,   -- FK omitted
  price DECIMAL NOT NULL,
  reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  grade TEXT NOT NULL,
  discount_rate DECIMAL NOT NULL,
  valid_until TIMESTAMP
);

-- Suggested indexes for app‑level integrity and performance
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_seat_id ON reservations(seat_id);
```

> Note: Integrity (e.g., orphan rows) is validated in application code and via periodic batch checks instead of FK constraints.

---

## ⚙️ Tech Stack

- Backend: Node.js + Express
- Database: PostgreSQL (no FK constraints)
- Batch Jobs: node‑cron for monthly tier renewal
- Containerization: Docker Compose

---

## 📂 Project Structure

```
📦 seat-reservation-system
 ┣ 📂 src
 ┃ ┣ 📂 routes        # API endpoints
 ┃ ┣ 📂 models        # DB access layer
 ┃ ┣ 📂 controllers   # Business logic
 ┃ ┗ 📂 jobs          # Scheduled tasks (tier renewal, integrity checks)
 ┣ 📂 db
 ┃ ┣ init.sql         # Schema (FK-free)
 ┃ ┗ seed.sql         # Sample data
 ┣ 📂 docs            # ERD, design notes
 ┣ docker-compose.yml
 ┣ package.json
 ┗ README.md
```

---

## 🧪 Data Integrity Checker (추천 추가)

FK를 쓰지 않는 만큼, 배치 스크립트로 고아(orphan) 레코드를 주기적으로 점검하는 것이 실무적으로 유의미합니다. 아래처럼 간단한 점검을 넣을 수 있습니다.

- Orphan Reservations: `reservations.user_id`가 `users.id`에 없음, `reservations.seat_id`가 `seats.id`에 없음
- Duplicated Seats: `seats.seat_number` 중복 여부
- Invalid Status: `seats.status`가 허용 값 외인지 검사

예시 SQL:

```sql
-- Orphan reservations by user
SELECT r.*
FROM reservations r
LEFT JOIN users u ON u.id = r.user_id
WHERE u.id IS NULL;

-- Orphan reservations by seat
SELECT r.*
FROM reservations r
LEFT JOIN seats s ON s.id = r.seat_id
WHERE s.id IS NULL;

-- Duplicate seat_number
SELECT seat_number, COUNT(*)
FROM seats
GROUP BY seat_number
HAVING COUNT(*) > 1;
```

Node 스크립트 골격 예시 (`scripts/checkIntegrity.ts`):

```ts
import { Client } from 'pg';

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const checks = {
    orphanByUser: `SELECT COUNT(*) AS c FROM reservations r LEFT JOIN users u ON u.id = r.user_id WHERE u.id IS NULL`,
    orphanBySeat: `SELECT COUNT(*) AS c FROM reservations r LEFT JOIN seats s ON s.id = r.seat_id WHERE s.id IS NULL`,
    dupSeats: `SELECT COUNT(*) AS c FROM (SELECT seat_number FROM seats GROUP BY seat_number HAVING COUNT(*)>1) t`,
  } as const;

  for (const [name, sql] of Object.entries(checks)) {
    const { rows } = await client.query(sql);
    console.log(`${name}:`, rows[0]?.c ?? 0);
  }

  await client.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
```

`package.json` 스크립트 예시:

```json
{
  "scripts": {
    "check:data-integrity": "ts-node scripts/checkIntegrity.ts"
  }
}
```

크론 실행 예시(node‑cron): 매일 03:00에 점검 및 슬랙 알림 등으로 확장 가능합니다.

---

## 📅 Roadmap

- FK‑free schema setup
- Reservation API (with seat lock)
- Membership & coupon logic
- Monthly tier renewal job
- Data integrity checker (batch script to detect orphan rows)

---

## 🎓 Educational Value

- Demonstrates real‑world DB trade‑offs (FK omitted for scalability)
- Shows how to handle data integrity in code rather than in DB constraints
- Highlights student exploration of production‑inspired design

---

## 🧑‍💻 How to Run

```bash
# Clone repo
git clone https://github.com/your-username/seat-reservation-system.git
cd seat-reservation-system

# Start services
docker compose up -d

# Install dependencies
npm install

# Run server (dev)
npm run dev

# Optional: run integrity checks
npm run check:data-integrity
```

Server runs at: http://localhost:3000

---

## 📜 License

MIT License. Free to use for learning and portfolio purposes.

---

## Notes

- This repository intentionally avoids FK constraints to mimic certain production environments where application‑level validation and batch remediation are preferred for flexibility and scalability.
- For interviews, emphasize how you handle race conditions (seat locking), eventual consistency, and batch‑based data hygiene.
