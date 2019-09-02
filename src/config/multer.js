import multer from 'multer'
import { extname, resolve } from 'path'
import crypto from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      console.log(
        crypto.randomBytes(16, (err, res) => {
          if (err) {
            return callback(err)
          }
          console.log(file)
          return callback(
            null,
            res.toString('hex') + extname(file.originalname)
          )
        })
      )
    }
  })
}
