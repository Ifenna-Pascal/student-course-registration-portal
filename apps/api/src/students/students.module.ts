import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, studentSchema } from './students.schema';
import { StudentsController } from './students.controller';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
   CoursesModule,
    MongooseModule.forFeature([{
      name: Student.name,
      schema: studentSchema
    }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}