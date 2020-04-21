import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionPostPutReq } from '../../models/question';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-question',
  templateUrl: './create-update-question.component.html',
  styleUrls: ['./create-update-question.component.scss']
})
export class CreateUpdateQuestionComponent implements OnInit {

  questionForm: FormGroup;
  imgSrc: any;
  image: File;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionPostPutReq | null) { }

  @HostListener('window:paste', ['$event.clipboardData.files'])
  handleImgPaste(files: []) {
    if(files.length > 0){
      this.onChange(files);
    }
  }

  ngOnInit() {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.questionForm = new FormGroup({
      parent_exam_num: new FormControl(this.data.parent_exam_num ? this.data.parent_exam_num : '0', Validators.required),
      question: new FormControl(this.data ? this.data.question : '', Validators.required),
      question_img: new FormControl(null) 
    });
    if(this.data && this.data.question_img) {
      this.imgSrc = this.data.question_img;
    }
  }

  onChange(givenFiles) {
    let fileType = givenFiles[0].type.substring(0, givenFiles[0].type.indexOf('/'));
    if(fileType !== 'image') return;
    this.image = givenFiles[0];
    let reader = new FileReader();
    reader.readAsDataURL(givenFiles[0]); 
    reader.onload = (_event) => { 
      this.imgSrc = reader.result; 
    }
  }

  onSubmit() {
    let objToPass = {
      parent_exam_num: Number(this.questionForm.value.parent_exam_num),
      question: this.questionForm.value.question
    };
    if(this.data && !this.data.question && this.image) {
      objToPass['question_img'] = this.image;
    }
    this.dialogRef.close(objToPass);
  }

}
