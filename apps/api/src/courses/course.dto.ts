import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CourseDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    imageUrl: string;
}