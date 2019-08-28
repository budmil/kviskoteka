import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgraDanaComponent } from './igra-dana.component';

describe('IgraDanaComponent', () => {
  let component: IgraDanaComponent;
  let fixture: ComponentFixture<IgraDanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgraDanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgraDanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
