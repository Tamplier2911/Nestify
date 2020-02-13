import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches
} from "class-validator";

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(40)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must contain at least one capital character and one numeric."
  })
  password: string;
}
