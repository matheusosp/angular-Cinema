import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSessoesComponent } from './cadastro-sessoes.component';

describe('CadastroSessoesComponent', () => {
  let component: CadastroSessoesComponent;
  let fixture: ComponentFixture<CadastroSessoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSessoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSessoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
