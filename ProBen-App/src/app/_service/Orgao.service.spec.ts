/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrgaoService } from './Orgao.service';

describe('Service: Orgao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgaoService]
    });
  });

  it('should ...', inject([OrgaoService], (service: OrgaoService) => {
    expect(service).toBeTruthy();
  }));
});
