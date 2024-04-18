import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, courseSchema } from './course.schema';
import { OwnedCourse, ownedCourseSchema } from './owned-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: courseSchema
      },
      {
        name: OwnedCourse.name,
        schema:ownedCourseSchema
      }
  ]),

  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
