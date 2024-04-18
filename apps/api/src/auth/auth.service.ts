import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';
import { LoginDTO } from './auth.dto';
import { Student } from 'src/students/students.schema';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor (
        private userService: StudentsService,
        private jwtService: JwtService, 
    ){}

    async validateUser(payload:any) {
        const user = await this.userService.findOne({ email: payload.email });
    
        if (!user) {
          throw new UnauthorizedException();
        }
    
        return user;
      }

      async login(body: LoginDTO) {
        const { email, password } = body;
    
        const user = await this.userService.findOne({
          email,
        });
    
        if (!user) {
          throw new BadRequestException('Invalid email or password');
        }
    
        if (!user?.password) {
          throw new BadRequestException('Invalid email or password');
        }
    
        const isMatch = await user.comparePassword(password);
    
        if (!isMatch) {
          throw new BadRequestException('Invalid email or password');
        }
    
        const accessToken = this.jwtService.sign({ email });
    
        return {
          user,
          access_token: accessToken
        };
      }

    async createUser(user: Partial<Student>) {
        const existingUser = await this.userService.findOne({
            $or: [
              {email: user.email},
              {username: user.username}
            ]
        });
        if(existingUser) {
          throw new BadRequestException('user details already exists');
        }  
        const newUser = await this.userService.createStudent(user);
        if(newUser) {
          // create a library account
          const library = await axios.post('http://localhost:80/api/register', {
            studentId: newUser.id
          })
          // create a finance account
          const account = await axios.post('http://localhost:8081/accounts/', {
            studentId: newUser.id
          })
          console.log(account);
        }
        return {
            newUser
        }
    }
}
