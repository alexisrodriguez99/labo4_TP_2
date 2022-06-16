import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosFinalizadosComponent } from './reporte-turnos-finalizados.component';

describe('ReporteTurnosFinalizadosComponent', () => {
  let component: ReporteTurnosFinalizadosComponent;
  let fixture: ComponentFixture<ReporteTurnosFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosFinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
