import { ApiPropertyOptional } from "@nestjs/swagger"

export class RequestQuery {
  @ApiPropertyOptional()
  where: string
  
  @ApiPropertyOptional()
  order: string

  @ApiPropertyOptional()
  limit: number

  @ApiPropertyOptional()
  skip: number

}