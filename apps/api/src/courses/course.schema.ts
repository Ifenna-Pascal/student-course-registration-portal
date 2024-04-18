import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Schema({
    timestamps: true
})

export class Course {
    @Prop() 
    name: string;

    @Prop()
    price:number;

    @Prop()
    description: string;

    @Prop()
    imgUrl: string

    @Prop({
        default: false
    })
    isEnrolled: boolean
};

export const courseSchema = SchemaFactory.createForClass(Course);

export type courseDocument = Course & Document;
export type courseModel = Model<courseDocument> 