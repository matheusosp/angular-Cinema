import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSalasComponent } from './listagem-salas.component';

describe('ListagemSalasComponent', () => {
  let component: ListagemSalasComponent;
  let fixture: ComponentFixture<ListagemSalasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemSalasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
