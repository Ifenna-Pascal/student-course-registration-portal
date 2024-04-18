import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


type studentStatistics = {
  hashPassword(password: string): Promise<string>;
}

type studentMethods = {
  comparePassword(password: string): Promise<boolean>;
}


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
})

export class Student {
  
  @Prop() 
  id: string

  @Prop({ unique: true, required: true, trim: true })
  email: string;

   
  @Prop({required: false})
  firstName: string;

   
  @Prop({required: false})
  lastName: string;
  
  @Prop({ unique: true, required: true, trim: true })
  username: string;

  @Prop()
  password: string;
}

export const studentSchema = SchemaFactory.createForClass(Student)

studentSchema.methods.comparePassword = async function compare(password: string) {
    return bcrypt.compare(password, this.password);
  };
  

studentSchema.statics.hashPassword = async function hashPassword(
    password: string
  ) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };
  
  
studentSchema.pre('save', async function preSave(next) {
    if (this.isModified('password') || (this.isNew && this.password)) {
      const saltOrRounds = 10;
      this.password = await bcrypt.hash(this.password, saltOrRounds);
    }
    next();
  });
  
  export type studentDocument = Student & Document & studentMethods;
  
  export type studentModel = Model<studentDocument> & studentStatistics;