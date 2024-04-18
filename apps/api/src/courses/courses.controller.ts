import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDTO } from 'src/common/dto/response.dto';


@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for getting all courses' })
  @ApiOkResponse({
    description: 'added courses',

  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async getCourses(@Query() search: {search: string}) {
    console.log(search)
    const courses = await this.coursesService.findAll(search.search);
    return {data: courses};
  }

  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for getting one course' })
  @ApiOkResponse({
    description: 'added courses',

  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async getOneCourse(@Param() {id}: {id:string}) {
    const course = await this.coursesService.findOneCourse(id);
    return {data: course};
  }

  @Post('/add')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint seeding courses' })
  @ApiOkResponse({
    description: 'added courses',

  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async addCourses() {
    const newCourses = await this.coursesService.insertMany();
    return {data: newCourses};
  }
}
