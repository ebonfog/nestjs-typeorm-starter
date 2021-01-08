import { ApiProperty } from "@nestjs/swagger";

export class JwtTokenResponse {
  @ApiProperty()
  token: string
}

export class LoginForm {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}