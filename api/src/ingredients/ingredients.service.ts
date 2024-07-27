import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Recipe } from 'src/recipes/entities/recipe.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient: Ingredient = new Ingredient();
    ingredient.name = createIngredientDto.name;
    ingredient.aisle = createIngredientDto.aisle;
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (ingredient) {
      return ingredient;
    } else {
      throw new NotFoundException(`Ingredient ${id} cannot be found`);
    }
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (updateIngredientDto.name) {
      ingredient.name = updateIngredientDto.name;
    } else {
      ingredient.name = ingredient.name;
    }
    if (updateIngredientDto.aisle) {
      ingredient.aisle = updateIngredientDto.aisle;
    } else {
      ingredient.aisle = ingredient.aisle;
    }
    await this.ingredientRepository.save(ingredient);
    return await this.ingredientRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<{ affected?: number } | void> {
    const recipeAll = await this.recipeRepository.find({
      relations: ['ingredients'],
    });
    const tmp = [];
    recipeAll.map((elem) => {
      elem.ingredients.map((ingredient) => {
        tmp.push(ingredient.id);
      });
    });
    if (tmp.includes(id)) {
      throw new ConflictException(
        `Ingredient ${id} cannot be deleted, this ingredient is contained in at least one recipe.`,
      );
    } else {
      return this.ingredientRepository.delete(id);
    }
  }
}
