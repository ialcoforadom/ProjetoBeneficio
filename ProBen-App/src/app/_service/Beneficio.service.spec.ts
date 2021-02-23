/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BeneficioService } from './Beneficio.service';

describe('Service: Beneficio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeneficioService]
    });
  });

  it('should ...', inject([BeneficioService], (service: BeneficioService) => {
    expect(service).toBeTruthy();
  }));
});
