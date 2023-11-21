import { Internal_Server_Error } from '../../errors/api-error';
import {
  ISignInParams,
  ISignInRepository,
  ISignInReturn,
} from '../../repositories/SignIn/protocols';
import { IApiRequest, IApiResponse, IController } from '../protocols';

class SignInController implements IController {
  constructor(private readonly signInRepository: ISignInRepository) {}

  async handle(
    req: IApiRequest<ISignInParams>,
  ): Promise<IApiResponse<ISignInReturn>> {
    if (!req.body) {
      throw new Internal_Server_Error('Não foi possivel logar o usuário');
    }

    const { email, senha } = req.body;

    const logged = await this.signInRepository.signIn({
      email,
      senha,
    });

    return {
      body: logged,
      statusCode: 200,
    };
  }
}

export { SignInController };
