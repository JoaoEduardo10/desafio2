import { Schema, model } from 'mongoose';
import { OmitProperties } from '../types';
import { UserDTO } from '../interface/user';

type SchemaParams = OmitProperties<UserDTO, 'id'>;

const User = model(
  'User',
  new Schema<SchemaParams>({
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    data_atualizacao: {
      type: Date,
      default: Date.now(),
    },
    data_criacao: {
      type: Date,
      default: Date.now(),
    },
    telefones: [
      {
        ddd: {
          type: String,
          required: true,
        },
        numero: {
          type: String,
          required: true,
        },
      },
    ],
    ultimo_login: {
      type: Date,
      default: '',
    },
  }),
);

export { User };
