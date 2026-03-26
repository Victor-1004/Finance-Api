import { createServer } from './infra/server.js'
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await createServer()

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`)
  })
}

bootstrap()