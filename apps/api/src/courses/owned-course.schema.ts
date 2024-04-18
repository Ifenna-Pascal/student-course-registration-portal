import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Student } from "src/students/students.schema";
import { Course } from "./course.schema";

@Schema({
    timestamps: true
})

export class OwnedCourse {
    @Prop({
        type: mongoose.Types.ObjectId,
        ref: Student.name,
        required: true
    })
    studentId: Student;

    @Prop({
        type: String,
        required: false,
    })
    paymentReference: string

    @Prop({
        type: mongoose.Types.ObjectId,
        ref: Course.name,
        required: true
    })
    courseId: Course
}

export const ownedCourseSchema = SchemaFactory.createForClass(OwnedCourse);

export type ownedCourseDocument = OwnedCourse & Document;
export type ownedCourseModel = Model<ownedCourseDocument>;

