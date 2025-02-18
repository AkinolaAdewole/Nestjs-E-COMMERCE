// Import Test and TestingModule from @nestjs/testing
import { Test, TestingModule } from '@nestjs/testing';

// Import the TestController and TestService to be tested
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('TestController', () => {
  // Declare the controller variable that will hold the instance of TestController
  let controller: TestController;

  // beforeEach is called before each test to set up the testing module
  beforeEach(async () => {
    // Create a new testing module
    const module: TestingModule = await Test.createTestingModule({
      // Register the TestController for the module
      controllers: [TestController],
      
      // Register the TestService as a provider (injected dependency for the controller)
      providers: [TestService],
    }).compile(); // Compile the module (this processes and sets up the dependency injection system)

    // Retrieve the instance of TestController from the compiled module
    controller = module.get<TestController>(TestController);
  });

  // Define a basic test case to check if the controller is defined
  it('should be defined', () => {
    // Use Jest's expect function to assert that the controller is defined
    expect(controller).toBeDefined();
  });
});
