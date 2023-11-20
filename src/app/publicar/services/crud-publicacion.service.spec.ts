import { TestBed } from '@angular/core/testing';

import { CrudPublicacionService } from './crud-publicacion.service';

describe('CrudPublicacionService', () => {
  let service: CrudPublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
