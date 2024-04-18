import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentsModule } from 'src/students/students.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    StudentsModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: 'ifemoney',
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
