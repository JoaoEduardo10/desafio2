/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiRequest<B> {
  headers?: any;
  params?: any;
  body?: B;
}

export interface IApiResponse<B> {
  statusCode: number;
  body: B;
}

export interface IController {
  handle(req: IApiRequest<unknown>): Promise<IApiResponse<unknown>>;
}
