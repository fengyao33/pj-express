import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import './alias'
import logger from './helpers/logger'
import { handleCatchError, handleError404Middleware, handleErrorMiddleware } from './middlewares/error_handler'
import { rateLimiterMiddleware } from './middlewares/rate_limiter'

//importing routes
import routes from './router'

//importing configs
import { settings } from '@config/settings'

// import './connection/mongoDB'
import './database/database'


class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.middlewares()
    this.routes()
  }

  config() { }

  middlewares() {
    this.app.use(morgan('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]'))
    this.app.use(cors())
    this.app.use(rateLimiterMiddleware)
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes() {
    this.app.use(routes)
    this.app.use(handleErrorMiddleware)
    this.app.use(handleError404Middleware)
    this.app.use(handleCatchError)
  }

  start() {
    this.app.listen(settings.PORT, () => {
      logger.info('🚀 Server listen on port ' + settings.PORT)
    })
  }
}

const server = new Server()
server.start()
