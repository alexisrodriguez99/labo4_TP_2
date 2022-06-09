import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurnosEspecialistaComponent } from './lista-turnos-especialista.component';

describe('ListaTurnosEspecialistaComponent', () => {
  let component: ListaTurnosEspecialistaComponent;
  let fixture: ComponentFixture<ListaTurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTurnosEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
