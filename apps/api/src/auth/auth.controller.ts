import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, LoginResponseDTO, RegisterDTO } from './auth.dto';
import { ErrorResponseDTO } from 'src/common/dto/response.dto';
import { randomToken } from 'src/util/random';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login') 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for login request' })
  @ApiOkResponse({
    description: 'Login is successful',
    type: LoginResponseDTO
  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @Post('/create-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for register request' })
  @ApiOkResponse({
    description: 'User Created Successfully',
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })  
  async register(@Body() body: RegisterDTO) {
    const data = {
      ...body,
      id: randomToken()
    }
    console.log(data, "data")
    return await this.authService.createUser(data)
  }
}
