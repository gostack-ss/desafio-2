import jwt from 'jsonwebtoken'

import User from '../models/user'
import jwtConfig from '../../config/auth'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    console.log(await user.checkPassword(password))
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' })
    }
    const token = jwt.sign(user.id, jwtConfig.secret, jwtConfig.expiresIn)
    console.log(token)
    return token
  }
}

export default new SessionController()
