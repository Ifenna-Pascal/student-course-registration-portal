import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { StudentsService } from './students.service';
import { CoursesService } from 'src/courses/courses.service';
import { StudentsController } from './students.controller';

describe('StudentController', () => {
    let studentService: StudentsService;
    let courseService: CoursesService;
    let studentControlller: StudentsController 
    beforeEach(async () => {
        // Stand-ins for the services so the test needs no database
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StudentsController],
            providers: [
                { provide: StudentsService, useValue: { findOne: jest.fn() } },
                { provide: CoursesService, useValue: { findOneCourse: jest.fn(), hasEnrolled: jest.fn(), createCourseEnrollment: jest.fn() } },
            ],
        }).compile();

        studentControlller = module.get<StudentsController>(StudentsController);
        studentService = module.get<StudentsService>(StudentsService);
        courseService = module.get<CoursesService>(CoursesService)
    });

    it('should enroll a student in a course', async () => {
        const req = {
          user: { _id: 'user_id' }, // Assuming a user is authenticated
        };
        const idDto = { id: '661683bc6fcc93c6a8821683' };
        const student = { _id: 'user_id' };
        const course = { _id: '661683bc6fcc93c6a8821683', price: 100 };
        const reference = 'invoice_reference';
    
        jest.spyOn(studentService, 'findOne').mockResolvedValue(student as any);
        jest.spyOn(courseService, 'findOneCourse').mockResolvedValue(course as any);
        jest.spyOn(courseService, 'hasEnrolled').mockResolvedValue(null);
        jest.spyOn(axios, 'post').mockResolvedValue({ data: { reference } });
        const enrollment = { course: course._id, student: student._id, reference };
        jest.spyOn(courseService, 'createCourseEnrollment').mockResolvedValue(enrollment as any);
    
        const result = await studentControlller.enrollCourse(req, idDto);
    
        // The invoice reference is saved with the enrollment
        expect(courseService.createCourseEnrollment).toHaveBeenCalledWith(idDto.id, 'user_id', reference);
        expect(result).toEqual({ data: enrollment });
      });
    
  it('should throw NotFoundException if course is not found', async () => {
    const req = {
      user: { _id: '66242fdd0d15c44e1e84a15e' }, // Assuming a user is authenticated
    };
    const idDto = { id: '661683bc6fcc93c6a8821683' };

    jest.spyOn(studentService, 'findOne').mockResolvedValue({ id: '66242fdd0d15c44e1e84a15e' } as any);
    jest.spyOn(courseService, 'findOneCourse').mockResolvedValue(null);

    await expect(studentControlller.enrollCourse(req, idDto)).rejects.toThrow(NotFoundException);
  });
})