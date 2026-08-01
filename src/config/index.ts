import { configDotenv } from "dotenv";
import { env } from "process";

configDotenv()
const config={
NODE_ENV:"production",
PORT:env.PORT,
DATABASE_URL:env.DATABASE_URL,
}
export default config