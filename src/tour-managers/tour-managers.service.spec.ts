import { Test, TestingModule } from '@nestjs/testing';
import { TourManagersService } from './tour-managers.service';

describe('TourManagersService', () => {
  let service: TourManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourManagersService],
    }).compile();

    service = module.get<TourManagersService>(TourManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
