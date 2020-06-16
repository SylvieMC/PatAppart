import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsittersComponent } from './petsitters.component';

describe('PetsittersComponent', () => {
  let component: PetsittersComponent;
  let fixture: ComponentFixture<PetsittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
