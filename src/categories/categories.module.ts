// Import necessary decorators and modules from @nestjs/common
import { Module } from '@nestjs/common';

// Import the CategoriesService and CategoriesController
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

// Import TypeOrmModule to interact with the database using TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the CategoryEntity which represents the Category table in the database
import { CategoryEntity } from './entities/category.entity';

@Module({
  // Registering the CategoryEntity with TypeORM so it can be used in database operations
  imports: [TypeOrmModule.forFeature([CategoryEntity])], 
  
  // Register the controller that handles incoming requests related to categories
  controllers: [CategoriesController],

  // Register the service that contains the business logic related to categories
  providers: [CategoriesService],

  // Export CategoriesService to make it available for use in other modules
  exports: [CategoriesService]
})
export class CategoriesModule {}
