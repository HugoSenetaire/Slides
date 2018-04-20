import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftWindowComponent } from './left-window.component';

describe('LeftWindowComponent', () => {
  let component: LeftWindowComponent;
  let fixture: ComponentFixture<LeftWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
