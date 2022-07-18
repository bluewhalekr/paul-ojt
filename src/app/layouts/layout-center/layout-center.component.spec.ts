import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCenterComponent } from './layout-center.component';

describe('LayoutCenterComponent', () => {
  let component: LayoutCenterComponent;
  let fixture: ComponentFixture<LayoutCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
