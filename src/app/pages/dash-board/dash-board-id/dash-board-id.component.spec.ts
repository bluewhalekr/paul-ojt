import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardIdComponent } from './dash-board-id.component';

describe('DashBoardIdComponent', () => {
  let component: DashBoardIdComponent;
  let fixture: ComponentFixture<DashBoardIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
