import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLeccionComponent } from './crear-leccion.component';

describe('CrearLeccionComponent', () => {
  let component: CrearLeccionComponent;
  let fixture: ComponentFixture<CrearLeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
