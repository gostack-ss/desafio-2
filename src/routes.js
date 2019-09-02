import { Router } from 'express'
import multer from 'multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import authMiddleware from './app/middlewares/auth'
import multerConfig from './config/multer'

const routes = new Router()
const upload = multer(multerConfig)
// rotas publicas
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/files', upload.single('file'), FileController.store)

routes.use(authMiddleware)

// rotas privadas
routes.put('/users', UserController.update)
export default routes
