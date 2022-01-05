import { Test, TestingModule } from '@nestjs/testing';
import { TourManagersController } from './tour-managers.controller';

describe('TourManagersController', () => {
  let controller: TourManagersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourManagersController],
    }).compile();

    controller = module.get<TourManagersController>(TourManagersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
