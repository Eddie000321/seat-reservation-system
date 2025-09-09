// [서버 엔트리]
// TODO: 아래 단계를 따라 서버를 부팅하세요.
// 1) express 애플리케이션을 생성하는 createApp 함수를 app.ts 에 구현합니다.
// 2) 여기서 createApp 을 import 하여 호출합니다.
// 3) PORT 환경변수(기본 4000)를 읽어 app.listen 으로 서버를 시작합니다.
// 4) 서버 시작/에러 로그를 콘솔에 남기세요.
// 5) 종료 시그널(SIGINT, SIGTERM) 수신 시 서버를 정상 종료하도록 처리합니다.

// 힌트(찾아 타이핑):
// - import { createApp } from "./app"
// - const app = createApp()
// - const port = Number(process.env.PORT) || 4000
// - const server = app.listen(port, () => console.log(`Server on ${port}`))
// - process.on("SIGTERM", () => server.close())

