import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export interface IFormatExceptionMessage {
  message: string;
  code?: number;
}

@Injectable()
export class ExceptionsService {
  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  conflicException(data?: IFormatExceptionMessage): void {
    throw new ConflictException(data);
  }
}
