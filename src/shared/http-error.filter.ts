import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getResponse()['statusCode'];

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.getResponse()['message'] || null,
      error: exception.getResponse()['error'],
    };

    Logger.error(
      `${errorResponse.method} | ${errorResponse.path} | ${errorResponse.error} | ${errorResponse.code} | ${errorResponse.message}`,
      exception.stack,
      'HttpErrorFilter',
    );

    response.status(status).json(errorResponse);
  }
}
