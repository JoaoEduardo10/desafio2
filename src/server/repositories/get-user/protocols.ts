import { UserDTO } from '../../../interface/user';

export interface IGetUserParams {
  id: string;
}

export interface IGetUserRepository {
  get(params: IGetUserParams): Promise<UserDTO>;
}
