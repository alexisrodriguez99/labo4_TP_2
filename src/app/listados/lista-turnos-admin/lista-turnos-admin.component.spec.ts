import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurnosAdminComponent } from './lista-turnos-admin.component';

describe('ListaTurnosAdminComponent', () => {
  let component: ListaTurnosAdminComponent;
  let fixture: ComponentFixture<ListaTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTurnosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
