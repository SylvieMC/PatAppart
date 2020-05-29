import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditanimalComponent } from './editanimal.component';

describe('EditanimalComponent', () => {
  let component: EditanimalComponent;
  let fixture: ComponentFixture<EditanimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditanimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
