/* eslint-disable camelcase */
import multer from 'multer';
import multerconfig from '../config/multerconfig';
import Fotos from '../models/Fotos';

const upload = multer(multerconfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await Fotos.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno nao existe'],
        });
      }
    });
  }
}

export default new FotoController();
