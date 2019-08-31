import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaLozinkaComponent } from './nova-lozinka.component';

describe('NovaLozinkaComponent', () => {
  let component: NovaLozinkaComponent;
  let fixture: ComponentFixture<NovaLozinkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaLozinkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaLozinkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
