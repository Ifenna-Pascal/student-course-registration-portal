import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDTO } from 'src/common/dto/response.dto';
import { CoursesService } from 'src/courses/courses.service';
import { IdDto } from './student.dto';
import axios from 'axios';
import { Student } from './students.schema';

@UseGuards(JwtAuthGuard)
@Controller('student')
@ApiTags('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService, 
    private readonly courseService: CoursesService
  ){}


  @Get('/profile') 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for login request' })
  @ApiOkResponse({
    description: 'returned user profile',
  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async getStudentProfile(@Request() req) {
    const userId = req.user._id;
    const user = await this.studentsService.findOne({_id: userId});
    return {data: user};
  };

  
  
  @Put('/update-profile') 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for updating student profile' })
  @ApiOkResponse({
    description: 'returned user updated profile',
  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async updateStudentProfile(@Request() req, @Body() data: Partial<Student>) {
    const updatedProfile = await this.studentsService.updateStudentProfile({_id: req.user._id}, data);
    return {data: updatedProfile}
  }


  @Get('/enrolled-courses')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for fetching all enrolled courses' })
  @ApiOkResponse({
    description: 'returned all students enrolled courses',
  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async getEnrolledCourses(@Request() req) {
    const userId = req.user._id;
    const courses = await this.courseService.getUserEnrolledCourses(userId);
    return {data: courses}
  }

  @Get('/can-graduate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for fetching eligiblity status' })
  @ApiOkResponse({
    description: 'returned all students enrolled courses',
  })
  @ApiBadRequestResponse({
    description: 'Credential is invalid',
    type: ErrorResponseDTO
  })
  async canGraduate(@Request() req) {
    const userId = req.user._id;
    const student = await this.studentsService.findOne({_id: userId});
    const res = await axios.get(`http://localhost:8081/accounts/student/${student.id}`);
    console.log(res, "result");
    const response = {hasOutStanding: res.data.hasOutstandingBalance}
    return {data: response};
  }


  @Post('/enroll-course/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Enroll in course'
  })
  @ApiOkResponse({
    description: 'Successfull course enrollment'
  })
  async enrollCourse(@Request() req, @Param() {id}: IdDto) {
    console.log(id);
    const userId = req.user._id;
    const student = await this.studentsService.findOne({_id: userId});
    if(!student) throw new NotFoundException('Student not found');
    const course = await this.courseService.findOneCourse(id);
    console.log(course, "courrr")
    if(!course) throw new NotFoundException('course not found');
    const hasEnrooled = await this.courseService.hasEnrolled(id, userId);
    console.log(hasEnrooled, "idd")
    if(hasEnrooled !== null) {
      throw new BadRequestException('Course is already enrolled')
    }
    console.log(student.id);
    const now = new Date();
    const next_one_month = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const data = {
      amount: course.price,
      type: 'TUITION_FEES',
      dueDate: next_one_month,
      account: {
          studentId: student.id
      }
  }
  let reference;
  await axios.post('http://localhost:8081/invoices/', data)
  .then(async(res) => {  
    console.log(res.data);
    reference = res.data.reference
  })
  .catch((err) => {
    throw new BadRequestException(err.response.data)
  });

  const enrolledCourse = await this.courseService.createCourseEnrollment(id, userId, reference)
  return {data: enrolledCourse}

  }
}



