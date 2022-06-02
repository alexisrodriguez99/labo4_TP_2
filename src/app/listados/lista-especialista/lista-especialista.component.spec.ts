import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspecialistaComponent } from './lista-especialista.component';

describe('ListaEspecialistaComponent', () => {
  let component: ListaEspecialistaComponent;
  let fixture: ComponentFixture<ListaEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
