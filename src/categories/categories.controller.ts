// Import necessary decorators and classes from @nestjs/common
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

// Import the CategoriesService to handle business logic for categories
import { CategoriesService } from './categories.service';

// DTO (Data Transfer Object) for creating and updating categories
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Define a controller to handle category-related routes
@Controller('categories') // This maps the controller to the '/categories' route
export class CategoriesController {
  
  // Inject the CategoriesService into the controller via the constructor
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Handle the HTTP POST request to create a new category
   * @Body is used to extract the category data from the request's body
   */
  @Post() // POST /categories
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto); // Calls the create method from the service
  }

  /**
   * Handle the HTTP GET request to retrieve all categories
   */
  @Get() // GET /categories
  findAll() {
    return this.categoriesService.findAll(); // Calls the findAll method from the service
  }

  /**
   * Handle the HTTP GET request to retrieve a specific category by its ID
   * @Param captures the 'id' parameter from the route
   */
  @Get(':id') // GET /categories/:id
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id); // Calls the findOne method, converts id to number
  }

  /**
   * Handle the HTTP PATCH request to update a category by its ID
   * @Param captures the 'id' parameter, @Body contains the updated category data
   */
  @Patch(':id') // PATCH /categories/:id
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto); // Calls the update method from the service
  }

  /**
   * Handle the HTTP DELETE request to remove a category by its ID
   * @Param captures the 'id' parameter from the route
   */
  @Delete(':id') // DELETE /categories/:id
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id); // Calls the remove method from the service
  }
}
