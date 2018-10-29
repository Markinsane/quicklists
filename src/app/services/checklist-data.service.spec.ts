import { TestBed, inject } from '@angular/core/testing';

import { ChecklistDataService } from './checklist-data.service';

describe('ChecklistDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistDataService]
    });
  });

  it('should be created', inject([ChecklistDataService], (service: ChecklistDataService) => {
    expect(service).toBeTruthy();
  }));
});
