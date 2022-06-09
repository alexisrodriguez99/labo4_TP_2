import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoHoraComponent } from './turno-hora.component';

describe('TurnoHoraComponent', () => {
  let component: TurnoHoraComponent;
  let fixture: ComponentFixture<TurnoHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
