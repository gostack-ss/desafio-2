import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { secret } from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' }) // retorna uma mensagem de erro
  }
  const [, token] = authHeader.split(' ')
  // console.log(authHeader)
  // jwt.verify(token, secret, res => console.log(res))
  const decoded = await promisify(jwt.verify)(token, secret)

  req.userId = decoded.id
  return next()
}
