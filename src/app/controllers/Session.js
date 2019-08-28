import jwt from 'jsonwebtoken'

import User from '../models/user'
import { secret, expiresIn } from '../../config/auth'

class SessionController {
  /**
   * Metodo de criação de uma nova sessão
   */
  async store(req, res) {
    const { email, password } = req.body // pega os dados enviados pelo front

    const user = await User.findOne({ where: { email } }) // verifica se o email do usuario está cadastrado

    // se o email nao estiver cadastrado
    if (!user) {
      return res.status(401).json({ error: 'user not found' }) // retorna uma mensagem de erro
    }

    // se a senha estiver correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' }) // retorna uma mensagem de erro
    }

    // se estiver tudo certo, email e senha batendo certinho

    const token = jwt.sign({ id: user.id }, secret, { expiresIn }) // gera o token da sessao

    const { id, name } = user

    return res.json({ user: { id, name, email }, token }) // e retorna pro front o token junto com os dados do usuario

    // sucesso! \o/
  }
}

export default new SessionController()
