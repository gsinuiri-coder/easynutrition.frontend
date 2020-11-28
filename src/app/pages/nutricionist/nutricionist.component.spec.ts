import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionistComponent } from './nutricionist.component';

describe('NutricionistComponent', () => {
  let component: NutricionistComponent;
  let fixture: ComponentFixture<NutricionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutricionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
