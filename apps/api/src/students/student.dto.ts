import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}

export class IdDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    id: string;
  }