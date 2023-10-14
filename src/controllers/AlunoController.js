// eslint-disable-next-line import/no-named-as-default
import Aluno from '../models/Aluno';
import Foto from '../models/Fotos';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = Aluno.create(req.body);

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

      const aluno = await Aluno.findByPk(id);

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
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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
      const aluno = await Aluno.findByPk(req.params.id);
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

export default new AlunoController();
