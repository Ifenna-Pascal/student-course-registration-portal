import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, courseModel } from './course.schema';
import { courses } from 'src/util/seeded-courses';
import { OwnedCourse, ownedCourseModel } from './owned-course.schema';
import { StudentsService } from 'src/students/students.service';
import axios from 'axios';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private courseModel: courseModel,
        @InjectModel(OwnedCourse.name) private ownedCourseModel: ownedCourseModel,
    ){}

    async findAll (searchParam?: string) {
        console.log(typeof searchParam)
        if(searchParam !== 'undefined') {
            return await this.courseModel.find({
                isEnrolled: false,
                name: {$regex: searchParam, $options: 'i'}
            })
    
        }else {
            return await this.courseModel.find({
                isEnrolled: false
            })
        }
    }

    async insertMany  () {
        return await this.courseModel.insertMany(courses)
    }

    async hasEnrolled (courseId, userId) {
        const course = await this.ownedCourseModel.findOne({courseId: courseId, studentId: userId})

        console.log(course);
        return course;
    }

    async findOneCourse (courseId) {
        return await this.courseModel.findOne({_id: courseId});
    }

    async getUserEnrolledCourses (studentId) {
        return await this.ownedCourseModel.find({
            studentId
        }).populate('courseId')
    }

    async createCourseEnrollment (courseId, studentId, paymentReference) {
        const enroll =  new this.ownedCourseModel({
            studentId,
            courseId,
            paymentReference
        });
        return enroll.save()
    }

}
