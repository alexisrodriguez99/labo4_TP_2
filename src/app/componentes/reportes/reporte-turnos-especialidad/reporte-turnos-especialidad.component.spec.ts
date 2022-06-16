import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosEspecialidadComponent } from './reporte-turnos-especialidad.component';

describe('ReporteTurnosEspecialidadComponent', () => {
  let component: ReporteTurnosEspecialidadComponent;
  let fixture: ComponentFixture<ReporteTurnosEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
