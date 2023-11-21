import { Internal_Server_Error } from '../../errors/api-error';
import {
  ISignUpParams,
  ISignUpRepository,
  ISignUpReturn,
} from '../../repositories/signUp/protocols';
import { IApiRequest, IApiResponse, IController } from '../protocols';

class SignUpController implements IController {
  constructor(private readonly signUpRepository: ISignUpRepository) {}

  async handle(
    req: IApiRequest<ISignUpParams>,
  ): Promise<IApiResponse<ISignUpReturn>> {
    if (!req.body) {
      throw new Internal_Server_Error('Não foi possivel criar o usuário');
    }

    const { email, nome, senha, telefones } = req.body;

    const user = await this.signUpRepository.signUp({
      email,
      nome,
      senha,
      telefones,
    });

    return {
      body: user,
      statusCode: 201,
    };
  }
}

export { SignUpController };
