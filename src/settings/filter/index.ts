import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

interface IError {
  message: string;
  status: string;
}

@Catch()
export class ExceptionFiltering implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, status: null };

    const detail = exception.detail;
    const table = exception.table;
    if (exception.constructor === QueryFailedError) {
      if (typeof detail === 'string' && detail.includes('already exists')) {
        status = HttpStatus.CONFLICT;
        const messageStart = table.split('_').join(' ') + ' with';
        message = { message: detail.replace('Key', messageStart) };
      }
    }

    const responseData = {
      ...{
        status: status,
        timestamp: new Date().toISOString(),
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);
    response.status(status).json(responseData);
    
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code=${
          message.status ? message.status : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code=${
          message.status ? message.status : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
