import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Apple', description: 'The name of the ingredient' })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Fruit',
    description: 'The name of the category to which this ingredient belongs',
  })
  @IsString()
  @MinLength(2, { message: 'aisle must have at least 2 characters.' })
  @IsNotEmpty()
  aisle: string;
}
