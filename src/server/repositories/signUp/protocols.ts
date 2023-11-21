import { UserDTO } from '../../../interface/user';

export interface ISignUpParams {
  nome: string;
  email: string;
  senha: string;
  telefones: UserDTO['telefones'];
}

export interface ISignUpReturn {
  id: string;
  data_criacao: Date;
  data_atualizacao: Date;
  ultimo_login: Date | string;
  token: string;
}

export interface ISignUpRepository {
  signUp(params: ISignUpParams): Promise<ISignUpReturn>;
}
