import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      relations: ['ingredients'],
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id },
      relations: ['ingredients'],
    });
    if (recipe) {
      return recipe;
    } else {
      throw new NotFoundException(`Recipe ${id} not found`);
    }
  }

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe: Recipe = new Recipe();
    recipe.name = createRecipeDto.name;

    const type = ['breakfast', 'lunch', 'dinner'];
    if (type.includes(createRecipeDto.type)) {
      recipe.type = createRecipeDto.type;
    } else {
      throw new NotFoundException(
        `Invalid type, choose between 'breakfast', 'lunch', 'dinner'`,
      );
    }

    const allIngredients = await this.ingredientRepository.find();

    const allIngredientIds = allIngredients.map((ingredient) => ingredient.id);

    const ingredientEntities = createRecipeDto.ingredients.map((elem) => {
      if (allIngredientIds.includes(elem)) {
        return allIngredients.find((ingredient) => ingredient.id === elem);
      } else {
        throw new NotFoundException(`Ingredient ${elem} not found`);
      }
    });

    recipe.ingredients = ingredientEntities;
    recipe.instructions = createRecipeDto.instructions;

    return await this.recipeRepository.save(recipe);
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id },
      relations: ['ingredients'],
    });
    if (recipe.name !== updateRecipeDto.name) {
      console.log('BAZINGA');
      recipe.name = updateRecipeDto.name;
    } else {
      recipe.name = recipe.name;
    }
    const type = ['breakfast', 'lunch', 'dinner'];
    if (updateRecipeDto.type) {
      if (type.includes(updateRecipeDto.type)) {
        recipe.type = updateRecipeDto.type;
      } else {
        throw new NotFoundException(
          `Invalid type, choose between 'breakfast', 'lunch', 'dinner'`,
        );
      }
    } else {
      recipe.type = recipe.type;
    }

    const allIngredients = await this.ingredientRepository.find();
    const allIngredientIds = allIngredients.map((ingredient) => ingredient.id);

    if (updateRecipeDto.ingredients) {
      const ingredientEntities = updateRecipeDto.ingredients.map((elem) => {
        if (allIngredientIds.includes(elem)) {
          return allIngredients.find((ingredient) => ingredient.id === elem);
        } else {
          throw new NotFoundException(`Ingredient ${elem} not found`);
        }
      });
      recipe.ingredients = ingredientEntities;
    } else {
      recipe.ingredients = recipe.ingredients;
    }

    if (updateRecipeDto.instructions) {
      recipe.instructions = updateRecipeDto.instructions;
    } else {
      recipe.instructions = recipe.instructions;
    }

    await this.recipeRepository.save(recipe);
    return await this.recipeRepository.findOne({
      where: { id: id },
      relations: ['ingredients'],
    });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return await this.recipeRepository.delete(id);
  }
}
