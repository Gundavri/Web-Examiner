import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersDialogComponent } from './answers-dialog.component';

describe('AnswersDialogComponent', () => {
  let component: AnswersDialogComponent;
  let fixture: ComponentFixture<AnswersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
