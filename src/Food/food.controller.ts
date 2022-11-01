/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FoodDto } from './food.dto';
import { Food } from './food.entity';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  //Get all food
  @Get()
  async getAllFood(): Promise<Food[]> {
    return await this.foodService.findAllFood();
  }

  //Add new food
  @Post()
  async addFood(@Body() newFood: FoodDto) {
    return await this.foodService.addFood(newFood);
  }

  //Get by id
  @Get(':id')
  async getFoodById(@Param('id') id: number): Promise<Food> {
    return await this.foodService.getOneFood(id);
  }

  //update food
  @Patch(':id')
  async updateFood(
    @Param('id') id: number,
    @Body() newFood: FoodDto,
  ): Promise<Food> {
    return await this.foodService.updateFood(id, newFood);
  }

  //delete food
  @Delete(':id')
  async deleteFood(@Param('id') id: number): Promise<any> {
    return await this.foodService.deleteFood(id);
  }
}
