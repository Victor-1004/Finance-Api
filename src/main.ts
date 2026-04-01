import 'reflect-metadata'
import { AppDataSource } from './database/config.js';
import { createServer } from './infra/server.js'
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  AppDataSource.initialize().
    then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })
  const app = await createServer()

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`)
  })
  
}

bootstrap()