import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoEspecialidadComponent } from './turno-especialidad.component';

describe('TurnoEspecialidadComponent', () => {
  let component: TurnoEspecialidadComponent;
  let fixture: ComponentFixture<TurnoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
