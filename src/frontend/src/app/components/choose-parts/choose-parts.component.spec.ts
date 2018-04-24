import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePartsComponent } from './choose-parts.component';

describe('ChoosePartsComponent', () => {
  let component: ChoosePartsComponent;
  let fixture: ComponentFixture<ChoosePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
