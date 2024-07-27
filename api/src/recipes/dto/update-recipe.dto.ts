import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({ example: 'Bolognaise', description: 'The name of the recipe' })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters.'" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'breakfast| lunch | dinner',
    description: 'What type of meal does the recipe belong to',
  })
  @IsEnum(['breakfast', 'lunch', 'dinner'], {
    message: 'Type must be either breakfast, lunch, or dinner.',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: '[1, 3]', description: 'Array of ingredient IDs' })
  @IsArray()
  @ArrayMinSize(1, { message: 'There must be at least one ingredient.' })
  @IsNotEmpty()
  @IsNumber({}, { each: true, message: 'Each ingredient ID must be a number.' })
  ingredients: number[];

  @ApiProperty({
    example:
      "1.Faites durcir les œufs 9 min dans une casserole d'eau frémissante, refroidissez-les rapidement dans l'eau froide puis écalez-les et coupez-les en quartiers. Pendant ce temps, coupez les tomates en quartiers, le poivron en lamelles, les olives et les radis en fines rondelles. Égouttez le thon et les les filets d'anchois.2.Dressez la salade niçoise directement dans les assiettes : déposez d'abord quelques feuilles de mesclun, puis les quartiers de tomates en étoile. Répartissez ensuite le poivron, les filets d'anchois et le thon émietté. Terminez avec les radis, les œufs et les olives.3.Préparez la vinaigrette en émulsionnant dans un bol la moutarde, le vinaigre, l'huile d'olive, un peu de sel et de poivre. Nappez-en les assiettes, et dégustez immédiatement.",
    description: 'Cooking Instructions',
  })
  @IsNotEmpty({ message: 'Instructions cannot be empty.' })
  @IsString()
  instructions: string;
}
