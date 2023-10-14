"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-named-as-default
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Fotos2.default, 'id', 'DESC']],
      include: {
        model: _Fotos2.default,
        attributes: ['url', 'filename'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = _Aluno2.default.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID nao encontrado ou nao existe'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['aluno nao encontrado ou nao existe'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);
      return res.json(alunoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID nao encontrado ou nao existe'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Fotos2.default, 'id', 'DESC']],
        include: {
          model: _Fotos2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['aluno nao encontrado ou nao existe'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }

  async delete(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id);
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID nao encontrado ou nao existe'],
        });
      }

      if (!aluno) {
        return res.status(400).json({
          errors: ['aluno nao encontrado ou nao existe'],
        });
      }
      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.messages),
      });
    }
  }
}

exports. default = new AlunoController();
