import { Router } from 'express'
import UserController from './app/controllers/User'
import SessionController from './app/controllers/Session'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

// rotas publicas
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

// rotas privadas
routes.put('/users', UserController.update)
export default routes
