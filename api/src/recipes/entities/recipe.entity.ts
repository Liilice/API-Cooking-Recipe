import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['breakfast', 'lunch', 'dinner'] })
  type: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @Column('text')
  instructions: string;
}
