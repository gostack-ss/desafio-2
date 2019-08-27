import * as Yup from 'yup'
import User from '../models/user'

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(2),
      email: Yup.string()
        .email()
        .required()
    })
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email } = req.body

    const userExist = User.findAll({ where: { email } })
    if (userExist) {
      return res.status(409).json({ error: 'User already exist' })
    }
    console.log('passou')
    const user = await User.create(req.body)
    return res.json(user)
  }
}

export default new UserController()
