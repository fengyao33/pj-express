import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'

let env: any =dotenv.config()
if (env.error) console.log(env.error)
env = dotenvParseVariables(env.parsed!)

export const settings = {
  PORT: env.PORT || 3000,
  SECRET: env.SECRET || 'somesecrettoken',
  DB: {
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    NAME: env.DB_NAME,
    URI: env.DB_URI,
  },
  MAILER: {
    HOST: env.MAIL_HOST,
    PORT: env.MAIL_PORT,
    USERNAME: env.MAIL_USERNAME,
    PASSWORD: env.MAIL_PASSWORD,
    FROM_ADDRESS: env.MAIL_FROM_ADDRESS,
    FROM_NAME: env.MAIL_FROM_NAME,
  },
  JWT: {
    JWT_EXPIRE_DAYS: env.JWT_EXPIRE_DAYS,
    JWT_SECRET: env.JWT_SECRET
  },
  ECPAY: {
    ECPAY_HASHKEY: env.ECPAY_HASHKEY,
    ECPAY_HASHIV: env.ECPAY_HASHIV,
    ECPAY_RETURNURL: env.ECPAY_RETURNURL,
    ECPAY_CLIENTBACKURL: env.ECPAY_CLIENTBACKURL
  },
  FIREBASE: {
    TYPE: env.FIREBASE_TYPE,
    PROJECT_ID: env.FIREBASE_PROJECT_ID,
    PROJECT_KEY_ID: env.PROJECT_KEY_ID,
    PROJECT_KEY: env.PROJECT_KEY,
    CLIENT_ID: env.CLIENT_ID,
    CLIENT_EMAIL: env.CLIENT_EMAIL,
    AUTH_URL: env.AUTH_URL,
    TOKEN_URL: env.TOKEN_URL,
    AUTH_PROVIDER: env.AUTH_URL,
    CLIENT_URL: env.CLIENT_URL,
    UNIVERSE: env.UNIVERSE
  },
  SEAT_LOCK_SECONDS: env.SEAT_LOCK_SECONDS
}
