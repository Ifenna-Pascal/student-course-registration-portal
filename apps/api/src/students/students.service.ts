import { Injectable } from '@nestjs/common';
import { Student, studentModel } from './students.schema';
import { FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: studentModel
) {}
  async findOne(filter: FilterQuery<Student>) {
    return await this.studentModel
        .findOne(filter)
  }
  async createStudent (createStudentDTO: Partial<Student>) {
    createStudentDTO.email = createStudentDTO.email.toLocaleLowerCase();
    const newStudent = new this.studentModel(createStudentDTO);
    return await newStudent.save();
  }

  async updateStudentProfile (student, object) {
    const updatedStudent = this.studentModel.updateOne(student, object);
    return updatedStudent
  }
}
