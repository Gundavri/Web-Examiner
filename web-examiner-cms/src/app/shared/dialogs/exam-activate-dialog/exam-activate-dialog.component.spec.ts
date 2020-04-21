import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamActivateDialogComponent } from './exam-activate-dialog.component';

describe('ExamActivateDialogComponent', () => {
  let component: ExamActivateDialogComponent;
  let fixture: ComponentFixture<ExamActivateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamActivateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamActivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
