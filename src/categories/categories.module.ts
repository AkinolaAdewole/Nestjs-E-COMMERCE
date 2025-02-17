import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  // Registering the CategoryEntity with TypeORM so it can be used in database operations
  imports:[TypeOrmModule.forFeature([CategoryEntity])],

   // Register the controller that handles incoming requests related to categories
  controllers: [CategoriesController],

  // Register the service that contains the business logic related to categories
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
