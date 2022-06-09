import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFechaComponent } from './turno-fecha.component';

describe('TurnoFechaComponent', () => {
  let component: TurnoFechaComponent;
  let fixture: ComponentFixture<TurnoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
