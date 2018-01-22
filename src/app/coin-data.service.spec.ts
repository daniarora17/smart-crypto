import { TestBed, inject } from '@angular/core/testing';

import { CoinDataService } from './coin-data.service';

describe('CoinDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinDataService]
    });
  });

  it('should be created', inject([CoinDataService], (service: CoinDataService) => {
    expect(service).toBeTruthy();
  }));
});
