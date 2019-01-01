import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoopingCartSummaryComponent } from './shooping-cart-summary.component';

describe('ShoopingCartSummaryComponent', () => {
  let component: ShoopingCartSummaryComponent;
  let fixture: ComponentFixture<ShoopingCartSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoopingCartSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoopingCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
