import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasListComponent } from './pessoas-list.component';

describe('PessoasListComponent', () => {
  let component: PessoasListComponent;
  let fixture: ComponentFixture<PessoasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
