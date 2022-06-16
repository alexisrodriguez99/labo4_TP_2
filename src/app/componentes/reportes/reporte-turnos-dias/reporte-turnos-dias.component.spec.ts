import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosDiasComponent } from './reporte-turnos-dias.component';

describe('ReporteTurnosDiasComponent', () => {
  let component: ReporteTurnosDiasComponent;
  let fixture: ComponentFixture<ReporteTurnosDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
