"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'nome blavblablalbla....',
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'sobrenome blavblablalbla....',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          isEmail:
          { msg: 'email blavblablalbla....' },
        },
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'indade tem que ser um inteiro',
          },
        },
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'peso tem que ser um float',
          },
        },
      },
      altura: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'altura tem que ser um float',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
