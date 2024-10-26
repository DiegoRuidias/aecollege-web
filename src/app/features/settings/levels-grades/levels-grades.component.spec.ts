import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsGradesComponent } from './levels-grades.component';

describe('LevelsGradesComponent', () => {
  let component: LevelsGradesComponent;
  let fixture: ComponentFixture<LevelsGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelsGradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelsGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
