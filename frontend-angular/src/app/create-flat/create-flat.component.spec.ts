import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlatComponent } from './create-flat.component';

describe('CreateFlatComponent', () => {
  let component: CreateFlatComponent;
  let fixture: ComponentFixture<CreateFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFlatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
