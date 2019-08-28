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
    const {email} = req.body
    
  }
}

export default new UserController()
