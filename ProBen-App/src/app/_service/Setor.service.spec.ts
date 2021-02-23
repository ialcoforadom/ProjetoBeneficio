/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SetorService } from './Setor.service';

describe('Service: Setor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetorService]
    });
  });

  it('should ...', inject([SetorService], (service: SetorService) => {
    expect(service).toBeTruthy();
  }));
});
