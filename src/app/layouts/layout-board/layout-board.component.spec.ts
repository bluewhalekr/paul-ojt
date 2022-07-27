import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBoardComponent } from './layout-board.component';

describe('LayoutBoardComponent', () => {
  let component: LayoutBoardComponent;
  let fixture: ComponentFixture<LayoutBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
