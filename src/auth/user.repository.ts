import { Repository, EntityRepository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import * as bcript from "bcrypt";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password, 12);
    user.createdAt = new Date();

    // const result = await this.validateUserPassword(
    //   "Test1234",
    //   "$2b$12$F5huTIea1oXBsxZpEARKsOUYhkQ36GwkrjkI/LlU1cWO/lqyTVb8."
    // );
    // console.log(result);

    try {
      await user.save();
    } catch (err) {
      if (err.code === "23505") {
        // duplicate email
        throw new ConflictException("User with this email is already exists.");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

    const user = await this.findOne({ email: email });
    if (!user)
      throw new NotFoundException("User with this email does not exist.");

    const valid = await this.validateUserPassword(password, user.password);
    if (!valid)
      throw new UnauthorizedException(
        "Please, provide correct email and password."
      );

    // filter object fields
    delete user.id;
    delete user.password;
    delete user.createdAt;

    return user;
  }

  private async hashPassword(
    password: string,
    saltRounds: number
  ): Promise<string> {
    return bcript.hash(password, saltRounds);
  }

  private async validateUserPassword(
    candidate: string,
    hash: string
  ): Promise<boolean> {
    return bcript.compare(candidate, hash);
  }
}
