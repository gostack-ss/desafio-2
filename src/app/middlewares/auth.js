import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { secret } from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' }) // retorna uma mensagem de erro
  }
  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, secret)

    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' }) // retorna uma mensagem de erro
  }
}
