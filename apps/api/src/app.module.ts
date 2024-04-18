import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './common/config/app.config';
import databaseConfig from './common/config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { paginatePlugin, searchPlugin } from './db-plugins';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
      ]
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.url'),
        connectionFactory: (connection) => {
          Logger.log('DB CONNECTED')
          connection.plugin(paginatePlugin);
          connection.plugin(searchPlugin)
          Logger.log('DB CONNECTED')
          return connection
        }
      })
    }),
    StudentsModule,
    AuthModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
