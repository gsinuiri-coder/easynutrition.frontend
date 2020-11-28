import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionistsComponent } from './nutricionists.component';

describe('NutricionistsComponent', () => {
  let component: NutricionistsComponent;
  let fixture: ComponentFixture<NutricionistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutricionistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
