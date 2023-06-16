import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings/validation';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BasicStrategy } from 'src/utils/strategies/basic/basic.strategy';
import { AccessTokenStrategy } from 'src/utils/strategies/jwt/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/utils/strategies/jwt/refreshToken.strategy';

import { DatabaseModule } from './database/database.module';
import { EditorialsModule } from './routes/editorials/editorials.module';
import { AuthorsModule } from './routes/authors/authors.module';
import { BooksModule } from './routes/books/books.module';
import { ClientsModule } from './routes/clients/clients.module';
import { ReservationsModule } from './routes/reservations/reservations.module';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    { ...JwtModule.register({}), global: true },
    DatabaseModule,
    EditorialsModule,
    AuthorsModule,
    BooksModule,
    ClientsModule,
    ReservationsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BasicStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AppModule {}
