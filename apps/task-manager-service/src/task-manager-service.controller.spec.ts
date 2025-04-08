import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagerServiceController } from './task-manager-service.controller';
import { TaskManagerServiceService } from './task-manager-service.service';

describe('TaskManagerServiceController', () => {
  let taskManagerServiceController: TaskManagerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskManagerServiceController],
      providers: [TaskManagerServiceService],
    }).compile();

    taskManagerServiceController = app.get<TaskManagerServiceController>(TaskManagerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(taskManagerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
