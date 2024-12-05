import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaysComponent } from './search-pays.component';

describe('SearchPaysComponent', () => {
  let component: SearchPaysComponent;
  let fixture: ComponentFixture<SearchPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
