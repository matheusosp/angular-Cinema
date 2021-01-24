import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSessaoComponent } from './ver-sessao.component';

describe('VerSessaoComponent', () => {
  let component: VerSessaoComponent;
  let fixture: ComponentFixture<VerSessaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSessaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
