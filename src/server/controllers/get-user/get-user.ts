import { UserDTO } from '../../../interface/user';
import { Internal_Server_Error } from '../../errors/api-error';
import { IGetUserRepository } from '../../repositories/get-user/protocols';
import { IApiRequest, IApiResponse, IController } from '../protocols';

class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async handle(req: IApiRequest<unknown>): Promise<IApiResponse<UserDTO>> {
    const { id }: { id: string } = req.params;

    if (!id) {
      throw new Internal_Server_Error('Não foi possivel buscar o usuário');
    }

    const user = await this.getUserRepository.get({
      id,
    });

    return {
      body: user,
      statusCode: 200,
    };
  }
}

export { GetUserController };
