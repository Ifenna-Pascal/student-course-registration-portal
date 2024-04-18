import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/error.filter';
import { TransformInterceptor } from './interceptors/transform.intrerceptor';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

    // setup config service
    const configService = app.get(ConfigService);
    app.use(helmet());
    app.enableCors({
      origin: '*',
      credentials: true
    })
 
    
    app.setGlobalPrefix(configService.get('app.apiPrefix'), {
      exclude: ['/']
    });
  
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
  
    // Starts listening for shutdown hooks
    if (configService.get('app.envName') !== 'development') {
      app.enableShutdownHooks();
    }
  
  // setup api documentation
  setupSwagger(app);


  await app.listen(3000);
  console.log(configService.get<string>('jwt.secret'));
  
  console.log(
    `Application server listening on port ${configService.get('app.port')}`
  );
}
bootstrap();
