export interface ISignInParams {
  email: string;
  senha: string;
}

export interface ISignInReturn {
  id: string;
  data_criacao: Date;
  data_atualizacao: Date;
  ultimo_login: Date | string;
  token: string;
}

export interface ISignInRepository {
  signIn(params: ISignInParams): Promise<ISignInReturn>;
}
