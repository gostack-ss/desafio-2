import * as Yup from 'yup'
import User from '../models/user'

class UserController {
  /**
   * Metodo de criação de um novo usuario
   */
  async store(req, res) {
    /* cria schema de validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(2),
      email: Yup.string()
        .email()
        .required()
    })

    // se tiver alguma informação que não estiver correta
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' }) // retorna uma mensagem de erro
    }

    const { name, email, password } = req.body

    const userExist = await User.findOne({ where: { email } }) // verifica se o email já não está cadastrado
    // se já estivet cadastrado
    if (userExist) {
      return res.status(409).json({ error: 'User already exist' }) // retorna uma mensagem de erro
    }

    // se estiver tudo certo com os dados enviado e o email ainda nao estiver cadastrado
    const { id } = await User.create({ name, email, password }) // grava no banco os dados do usuario
    return res.json({ id, name, email }) // retorna os dados
  }

  /**
   * Metodo de edição de usuario existente
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when(
          'password',
          ('password',
          (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field)
        )
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' }) // retorna uma mensagem de erro
    }
    const { email, oldPassword } = req.body
    const user = await User.findByPk(req.userId)
    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } })
      if (userExist) {
        return res.status(409).json({ error: 'User already exist' }) // retorna uma mensagem de erro
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' }) // retorna uma mensagem de erro
    }

    const { id, name } = await user.update(req.body)
    return res.json({ id, name, email }) // retorna uma mensagem de erro
  }
}

export default new UserController()
