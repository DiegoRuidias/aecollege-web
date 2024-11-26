import { TestBed } from '@angular/core/testing';

import { FileRegisterService } from './file-register.service';

describe('FileRegisterService', () => {
  let service: FileRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
