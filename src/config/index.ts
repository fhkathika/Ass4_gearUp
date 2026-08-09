import { configDotenv } from "dotenv";
import { env } from "process";

configDotenv()
const config={
NODE_ENV:"production",
PORT:env.PORT,
DATABASE_URL:env.DATABASE_URL,

    bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET!,
    jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN!,
    jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN!,
    stripe_product_key:process.env.STRIPE_PRODUCT_ID!,
    stripe_secret_key:process.env.STRIPE_SECRET_KEY!,
    sripe_webhook_secret:process.env.STRIPE_WEBHOOK_SECRECT!,
}
export default config