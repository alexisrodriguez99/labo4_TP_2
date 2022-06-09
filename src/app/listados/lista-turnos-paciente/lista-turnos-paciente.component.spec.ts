import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurnosPacienteComponent } from './lista-turnos-paciente.component';

describe('ListaTurnosPacienteComponent', () => {
  let component: ListaTurnosPacienteComponent;
  let fixture: ComponentFixture<ListaTurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTurnosPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
