/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodDto } from './food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(Food) private foodRepo: Repository<Food>) {}
  public async findAllFood(): Promise<Food[]> {
    return await this.foodRepo.find();
  }
  async addFood(newFood: FoodDto): Promise<Food> {
    const food = this.foodRepo.create(newFood);
    await this.foodRepo.save(food);
    return food;
  }
  async getOneFood(id: number): Promise<Food> {
    const food = this.foodRepo.findOne({ where: { id } });
    if (!food)
      throw new NotFoundException({
        success: false,
        message: 'food not found',
      });
    return food;
  }
  async updateFood(id: number, newFood: FoodDto): Promise<Food> {
    await this.foodRepo.update(id, newFood);
    const updateFood = await this.foodRepo.findOne({ where: { id } });
    if (!updateFood)
      throw new NotFoundException({
        success: false,
        message: 'food not found',
      });
    return updateFood;
  }
  async deleteFood(id: number) {
    const deleteResponse = await this.foodRepo.delete(id);
    if (!deleteResponse.affected)
      throw new NotFoundException({
        success: false,
        message: 'food not found',
      });
    return { success: true, message: 'delete finished' };
  }
}
