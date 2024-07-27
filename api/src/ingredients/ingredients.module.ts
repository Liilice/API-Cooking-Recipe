import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
