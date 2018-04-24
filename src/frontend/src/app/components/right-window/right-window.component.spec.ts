import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightWindowComponent } from './right-window.component';

describe('RightWindowComponent', () => {
  let component: RightWindowComponent;
  let fixture: ComponentFixture<RightWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
