"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerconfig = require('../config/multerconfig'); var _multerconfig2 = _interopRequireDefault(_multerconfig);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);

const upload = _multer2.default.call(void 0, _multerconfig2.default).single('foto');

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
        const foto = await _Fotos2.default.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno nao existe'],
        });
      }
    });
  }
}

exports. default = new FotoController();
