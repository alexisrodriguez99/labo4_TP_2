import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosMedicoComponent } from './reporte-turnos-medico.component';

describe('ReporteTurnosMedicoComponent', () => {
  let component: ReporteTurnosMedicoComponent;
  let fixture: ComponentFixture<ReporteTurnosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
