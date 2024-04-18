import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { StudentDTO } from 'src/students/student.dto';


export class LoginDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    @MinLength(5)
    password: string;
  }

  export class RegisterDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    
    @ApiProperty()
    @IsString()
    @MinLength(5)
    password: string;
  }

  class LoginActionDTO {
    @ApiProperty()
    access_token: string;
  
    @ApiProperty({ type: StudentDTO })
    user: StudentDTO;
  }
  
  export class LoginResponseDTO {
    @ApiProperty()
    status: string;
  
    @ApiProperty({ type: LoginActionDTO })
    data: LoginActionDTO;
  }
  