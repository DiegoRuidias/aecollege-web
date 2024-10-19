import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMenusComponent } from './roles-menus.component';

describe('RolesMenusComponent', () => {
  let component: RolesMenusComponent;
  let fixture: ComponentFixture<RolesMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
