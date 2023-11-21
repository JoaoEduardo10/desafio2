interface UserDTO {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefones: [{ numero: string; ddd: string }];
  data_criacao: Date;
  data_atualizacao: Date;
  token: string;
  ultimo_login: Date | string;
}

export { UserDTO };
