(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{Zlby:function(t,i,e){"use strict";e.r(i);var n=e("ofXK"),s=e("AytR"),r=e("fXoL"),a=e("lJxs"),o=e("tk/3");let c=(()=>{class t{constructor(t){this.httpClient=t,this.urlSuffix="/question",this.questions=[]}questionGetAll$(){return this.httpClient.get(this.urlSuffix).pipe(Object(a.a)(t=>t.map(this.addImagePath)))}questionsGet$(t){return this.httpClient.get(this.urlSuffix+"/"+t).pipe(Object(a.a)(t=>t.map(this.addImagePath)))}questionDelete$(t){return this.httpClient.delete(this.urlSuffix+"/"+t)}questionPost$(t){const i=new FormData;return i.append("question",t.question),i.append("question_img",t.question_img),i.append("parent_exam_num",String(t.parent_exam_num)),this.httpClient.post(this.urlSuffix,i)}questionPut$(t,i){return this.httpClient.put(this.urlSuffix+"/"+t,i)}addImagePath(t){return t.question_img=s.a.IMAGE_BASE_URL+t.question_img,t}}return t.\u0275fac=function(i){return new(i||t)(r.Vb(o.b))},t.\u0275prov=r.Ib({token:t,factory:t.\u0275fac}),t})();var u=e("4xmj"),d=e("S+vS"),b=e("kmnG"),l=e("qFsG"),p=e("bTqV");function m(t,i){if(1&t){const t=r.Sb();r.Rb(0,"div",5),r.Rb(1,"div",6),r.Rb(2,"strong"),r.uc(3,"Exam #"),r.Qb(),r.uc(4),r.Qb(),r.Rb(5,"div",7),r.Rb(6,"strong"),r.uc(7,"Question:"),r.Qb(),r.uc(8),r.Qb(),r.Rb(9,"div",8),r.Zb("click",(function(e){r.nc(t);const n=i.index;return r.dc().openImage(n)})),r.uc(10,"Image"),r.Qb(),r.Rb(11,"div",9),r.Rb(12,"button",10),r.Zb("click",(function(e){r.nc(t);const n=i.index;return r.dc().onAnswers(n)})),r.uc(13,"Answers"),r.Qb(),r.Qb(),r.Rb(14,"div",9),r.Rb(15,"button",11),r.Zb("click",(function(e){r.nc(t);const n=i.index;return r.dc().onUpdate(n)})),r.uc(16,"Update"),r.Qb(),r.Qb(),r.Rb(17,"div",9),r.Rb(18,"button",12),r.Zb("click",(function(e){r.nc(t);const n=i.index;return r.dc().onDelete(n)})),r.uc(19,"Delete"),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=i.$implicit;r.Bb(4),r.wc(" ",t.parent_exam_num,""),r.Bb(4),r.wc(" ",t.question.substr(0,70),"")}}let h=(()=>{class t{constructor(t,i,e){this.questionService=t,this.snackbarService=i,this.dialogService=e,this.questionsToShow=[],this.prevSearch="",this.urlParam=0,this.subscriptionsArr=[]}ngOnInit(){this.getQuestions()}getQuestions(){this.subscriptionsArr.push(this.questionService.questionGetAll$().subscribe(t=>{this.questionService.questions=t,this.search()},this.snackbarService.displayError))}onAdd(){this.subscriptionsArr.push(this.dialogService.openCreateUpdateQuestionDialog({question:"",parent_exam_num:null}).subscribe(t=>{t&&this.subscriptionsArr.push(this.questionService.questionPost$(t).subscribe(t=>{t.question_img=s.a.IMAGE_BASE_URL+t.question_img,this.questionService.questions.push(t),this.search()},this.snackbarService.displayError))}))}onUpdate(t){this.subscriptionsArr.push(this.dialogService.openCreateUpdateQuestionDialog(this.questionService.questions[t]).subscribe(i=>{i&&this.subscriptionsArr.push(this.questionService.questionPut$(this.questionsToShow[t]._id,i).subscribe(e=>{for(let n=0;n<this.questionService.questions.length;n++)if(this.questionService.questions[n]._id===this.questionsToShow[t]._id){this.questionService.questions[n].parent_exam_num=i.parent_exam_num?i.parent_exam_num:null,this.questionService.questions[n].question=i.question;break}this.search()},this.snackbarService.displayError))}))}onDelete(t){this.subscriptionsArr.push(this.dialogService.openConfirmDialog().subscribe(i=>{i&&this.subscriptionsArr.push(this.questionService.questionDelete$(this.questionsToShow[t]._id).subscribe(i=>{this.questionService.questions=this.questionService.questions.filter(i=>i._id!==this.questionsToShow[t]._id),this.search()},this.snackbarService.displayError))}))}onAnswers(t){this.subscriptionsArr.push(this.dialogService.openAnswersDialog(this.questionsToShow[t]).subscribe(t=>{}))}search(){this.questionsToShow=[...this.questionService.questions],this.questionsToShow=this.questionService.questions.filter(t=>t.question.toLowerCase().includes(this.prevSearch.toLowerCase())||t.parent_exam_num.toString().includes(this.prevSearch))}onSearchChange(t){this.prevSearch=t,this.search()}openImage(t){this.questionsToShow[t].question_img&&this.subscriptionsArr.push(this.dialogService.openViewImage(this.questionsToShow[t].question_img).subscribe(()=>{}))}ngOnDestroy(){this.subscriptionsArr.forEach(t=>t.unsubscribe())}}return t.\u0275fac=function(i){return new(i||t)(r.Mb(c),r.Mb(u.a),r.Mb(d.a))},t.\u0275cmp=r.Gb({type:t,selectors:[["app-questions"]],decls:9,vars:1,consts:[[1,"add-question"],["matInput","","placeholder","","type","text",3,"input"],["search",""],["mat-raised-button","","color","primary",1,"question-btn-add",3,"click"],["class","wrapper-question",4,"ngFor","ngForOf"],[1,"wrapper-question"],[1,"question-info-very-small"],[1,"question-info-small"],[1,"question-info-btn","img-btn",3,"click"],[1,"question-info","question-info-btn"],["mat-raised-button","","color","primary",1,"question-btn",3,"click"],["mat-raised-button","","color","accent",1,"question-btn",3,"click"],["mat-raised-button","","color","warn",1,"question-btn",3,"click"]],template:function(t,i){if(1&t){const t=r.Sb();r.Rb(0,"div",0),r.Rb(1,"mat-form-field"),r.Rb(2,"mat-label"),r.uc(3,"Search Question"),r.Qb(),r.Rb(4,"input",1,2),r.Zb("input",(function(e){r.nc(t);const n=r.lc(5);return i.onSearchChange(n.value)})),r.Qb(),r.Qb(),r.Rb(6,"button",3),r.Zb("click",(function(t){return i.onAdd()})),r.uc(7,"Add question"),r.Qb(),r.Qb(),r.tc(8,m,20,2,"div",4)}2&t&&(r.Bb(8),r.ic("ngForOf",i.questionsToShow))},directives:[b.b,b.e,l.a,p.a,n.i],styles:[".wrapper-question[_ngcontent-%COMP%]{display:-webkit-box;display:flex;height:3%;padding:5px;width:95%;margin:1.5% auto;background-color:rgba(0,0,0,.03);-webkit-box-align:center;align-items:center}.wrapper-question[_ngcontent-%COMP%]   .question-info[_ngcontent-%COMP%]{-webkit-box-flex:100;flex:100}.wrapper-question[_ngcontent-%COMP%]   .question-info-small[_ngcontent-%COMP%]{-webkit-box-flex:80;flex:80}.wrapper-question[_ngcontent-%COMP%]   .question-info-very-small[_ngcontent-%COMP%]{-webkit-box-flex:10;flex:10}.wrapper-question[_ngcontent-%COMP%]   .question-info-btn[_ngcontent-%COMP%]{-webkit-box-flex:8;flex:8}.wrapper-question[_ngcontent-%COMP%]   .status-text[_ngcontent-%COMP%]{font-weight:700;margin-right:5px;display:inline-block;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.wrapper-question[_ngcontent-%COMP%]   .question-btn[_ngcontent-%COMP%]{height:15px;width:25px;font-size:10px;line-height:7px}.wrapper-question[_ngcontent-%COMP%]   .img-btn[_ngcontent-%COMP%]{text-align:center;margin-right:10px;cursor:pointer;border:1px solid rgba(0,0,0,.2);border-radius:4px}.wrapper-question[_ngcontent-%COMP%]   .img-btn[_ngcontent-%COMP%]:hover{border:1px solid rgba(0,0,0,.4)}.add-question[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.add-question[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-left:2.5%;margin-top:1%}.add-question[_ngcontent-%COMP%]   .question-btn-add[_ngcontent-%COMP%]{margin-right:2.5%;margin-top:1%}"]}),t})();var g=e("tyNb"),f=e("PCNd"),w=e("R1ws"),x=e("FKr1");const q=["*",[["mat-card-footer"]]],v=["*","mat-card-footer"],_=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],S=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"];let C=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=r.Hb({type:t,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),t})(),k=(()=>{class t{constructor(){this.align="start"}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=r.Hb({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(t,i){2&t&&r.Db("mat-card-actions-align-end","end"===i.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),t})(),P=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=r.Hb({type:t,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-card-image"]}),t})(),y=(()=>{class t{constructor(t){this._animationMode=t}}return t.\u0275fac=function(i){return new(i||t)(r.Mb(w.a,8))},t.\u0275cmp=r.Gb({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-card"],hostVars:2,hostBindings:function(t,i){2&t&&r.Db("_mat-animation-noopable","NoopAnimations"===i._animationMode)},exportAs:["matCard"],ngContentSelectors:v,decls:2,vars:0,template:function(t,i){1&t&&(r.hc(q),r.gc(0),r.gc(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),t})(),Q=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=r.Gb({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-card-header"],ngContentSelectors:S,decls:4,vars:0,consts:[[1,"mat-card-header-text"]],template:function(t,i){1&t&&(r.hc(_),r.gc(0),r.Rb(1,"div",0),r.gc(2,1),r.Qb(),r.gc(3,2))},encapsulation:2,changeDetection:0}),t})(),M=(()=>{class t{}return t.\u0275mod=r.Kb({type:t}),t.\u0275inj=r.Jb({factory:function(i){return new(i||t)},imports:[[x.c],x.c]}),t})();var O=e("n4v8"),R=e("NFeN");function A(t,i){if(1&t&&r.Nb(0,"img",26),2&t){const t=r.dc().$implicit;r.ic("src",t.question_img,r.oc)}}function I(t,i){if(1&t){const t=r.Sb();r.Rb(0,"div",27),r.Rb(1,"mat-form-field"),r.Nb(2,"textarea",28,29),r.Qb(),r.Rb(4,"mat-form-field",30),r.Nb(5,"input",28,31),r.Qb(),r.Rb(7,"div",32),r.Nb(8,"img",33),r.Qb(),r.Rb(9,"div",34),r.Rb(10,"button",21),r.Zb("click",(function(e){r.nc(t);const n=i.index,s=r.lc(3),a=r.lc(6),o=r.dc().$implicit;return r.dc().onUpdate(n,s.value,a.value,o._id)})),r.Rb(11,"mat-icon"),r.uc(12,"save"),r.Qb(),r.Qb(),r.Rb(13,"button",35),r.Zb("click",(function(e){r.nc(t);const n=i.index,s=r.dc().$implicit;return r.dc().onDelete(n,s._id)})),r.Rb(14,"mat-icon"),r.uc(15,"clear"),r.Qb(),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=i.$implicit;r.Bb(2),r.ic("value",t.answer),r.Bb(3),r.ic("value",t.point),r.Bb(3),r.ic("src",t.answer_img,r.oc)}}function D(t,i){if(1&t&&r.Nb(0,"img",43),2&t){const t=r.dc(2).$implicit,i=r.dc();r.ic("src",i.imgSrc[t._id],r.oc)}}function $(t,i){if(1&t){const t=r.Sb();r.Rb(0,"div",27),r.Rb(1,"mat-form-field"),r.Nb(2,"textarea",36,37),r.Qb(),r.Rb(4,"mat-form-field",30),r.Nb(5,"input",36,38),r.Qb(),r.Rb(7,"div",32),r.Rb(8,"label",39),r.Rb(9,"span",40),r.Rb(10,"mat-icon"),r.uc(11,"attachment"),r.Qb(),r.Qb(),r.Rb(12,"input",41),r.Zb("change",(function(i){r.nc(t);const e=r.dc().$implicit;return r.dc().onChange(i.target.files,e._id)})),r.Qb(),r.Qb(),r.tc(13,D,1,1,"img",42),r.Qb(),r.Rb(14,"div",34),r.Rb(15,"button",21),r.Zb("click",(function(i){r.nc(t);const e=r.lc(3),n=r.lc(6),s=r.dc().$implicit;return r.dc().onNew(e.value,n.value,s._id)})),r.Rb(16,"mat-icon"),r.uc(17,"save"),r.Qb(),r.Qb(),r.Rb(18,"button",35),r.Zb("click",(function(i){r.nc(t);const e=r.dc().$implicit;return r.dc().onClear(e._id)})),r.Rb(19,"mat-icon"),r.uc(20,"clear"),r.Qb(),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=r.dc().$implicit,i=r.dc();r.Bb(13),r.ic("ngIf",i.imgSrc[t._id])}}function E(t,i){if(1&t){const t=r.Sb();r.Rb(0,"mat-card",6),r.Rb(1,"mat-card-header"),r.Rb(2,"div",7),r.Rb(3,"mat-form-field"),r.Rb(4,"mat-label"),r.uc(5,"Exam Num"),r.Qb(),r.Rb(6,"input",8,9),r.Zb("input",(function(e){r.nc(t);const n=i.index,s=r.lc(7),a=r.lc(13);return r.dc().changeIsDisabled(s.value,a.value,n)})),r.Qb(),r.Qb(),r.Qb(),r.Rb(8,"div",10),r.Rb(9,"mat-form-field"),r.Rb(10,"mat-label"),r.uc(11,"Question"),r.Qb(),r.Rb(12,"textarea",11,12),r.Zb("input",(function(e){r.nc(t);const n=i.index,s=r.lc(7),a=r.lc(13);return r.dc().changeIsDisabled(s.value,a.value,n)})),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(14,"div",13),r.tc(15,A,1,1,"img",14),r.Qb(),r.Rb(16,"mat-card-content"),r.Rb(17,"div",15),r.Rb(18,"div",16),r.Rb(19,"div",17),r.uc(20,"Answer"),r.Qb(),r.Rb(21,"div",18),r.uc(22,"Point"),r.Qb(),r.Rb(23,"div",19),r.uc(24,"Image"),r.Qb(),r.Qb(),r.Rb(25,"div",20),r.Rb(26,"button",21),r.Zb("click",(function(e){r.nc(t);const n=i.$implicit,s=r.dc();return s.addClicked[n._id]=!0,s.lastAnswersParent=n._id})),r.Rb(27,"mat-icon"),r.uc(28,"add"),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.tc(29,I,16,3,"div",22),r.tc(30,$,21,1,"div",23),r.Qb(),r.Rb(31,"mat-card-actions"),r.Rb(32,"button",24),r.Zb("click",(function(e){r.nc(t);const n=i.index,s=r.lc(7),a=r.lc(13);return r.dc().onQuestionUpdate(n,s.value,a.value)})),r.uc(33,"Save"),r.Qb(),r.Rb(34,"button",25),r.Zb("click",(function(e){r.nc(t);const n=i.index;return r.dc().onQuestionDelete(n)})),r.uc(35,"Delete"),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=i.$implicit,e=i.index,n=r.dc();r.Bb(6),r.ic("value",t.parent_exam_num),r.Bb(6),r.ic("value",t.question),r.Bb(3),r.ic("ngIf",t.question_img),r.Bb(14),r.ic("ngForOf",n.answers[t._id]),r.Bb(1),r.ic("ngIf",n.addClicked[t._id]),r.Bb(2),r.ic("disabled",n.isDisabled[e])}}let T=(()=>{class t{constructor(t,i,e,n,s){this.questionService=t,this.answerService=i,this.snackbarService=e,this.dialogService=n,this.route=s,this.questionsToShow=[],this.isDisabled=[],this.answers={},this.prevSearch="",this.urlParam=0,this.addClicked={},this.imgSrc={},this.image={},this.subscriptionsArr=[]}handleImgPaste(t){t.length>0&&this.lastAnswersParent&&this.addClicked[this.lastAnswersParent]&&this.onChange(t,this.lastAnswersParent)}ngOnInit(){this.urlParam=Number(this.route.snapshot.params.id),this.getQuestions()}getQuestions(){this.subscriptionsArr.push(this.questionService.questionsGet$(this.urlParam).subscribe(t=>{this.questionService.questions=t,this.questionService.questions.forEach(t=>{this.getAnswer(t._id),this.addClicked[t._id]=!1}),this.search()},this.snackbarService.displayError))}getAnswer(t){this.subscriptionsArr.push(this.answerService.answersGet$(t).subscribe(i=>{this.answers[t]=i}))}onQuestionAdd(){this.subscriptionsArr.push(this.dialogService.openCreateUpdateQuestionDialog({question:"",parent_exam_num:this.urlParam}).subscribe(t=>{t&&this.subscriptionsArr.push(this.questionService.questionPost$(t).subscribe(t=>{t.question_img=s.a.IMAGE_BASE_URL+t.question_img,this.questionService.questions.push(t),this.search()},this.snackbarService.displayError))}))}onQuestionUpdate(t,i,e){this.subscriptionsArr.push(this.questionService.questionPut$(this.questionsToShow[t]._id,{parent_exam_num:Number(i),question:e}).subscribe(n=>{for(let s=0;s<this.questionService.questions.length;s++)if(this.questionService.questions[s]._id===this.questionsToShow[t]._id){this.questionService.questions[s].parent_exam_num!==Number(i)?this.questionService.questions.splice(s,1):this.questionService.questions[s].question=e;break}this.search()},this.snackbarService.displayError))}changeIsDisabled(t,i,e){this.isDisabled[e]=Number(t)===this.questionsToShow[e].parent_exam_num&&i===this.questionsToShow[e].question}onQuestionDelete(t){this.subscriptionsArr.push(this.dialogService.openConfirmDialog().subscribe(i=>{i&&this.subscriptionsArr.push(this.questionService.questionDelete$(this.questionsToShow[t]._id).subscribe(i=>{this.questionService.questions=this.questionService.questions.filter(i=>i._id!==this.questionsToShow[t]._id),this.search()},this.snackbarService.displayError))}))}search(){this.questionsToShow=[...this.questionService.questions],this.isDisabled=new Array(this.questionsToShow.length).fill(!0),this.questionsToShow=this.questionService.questions.filter(t=>t.question.toLowerCase().includes(this.prevSearch.toLowerCase())||t.parent_exam_num.toString().includes(this.prevSearch))}onSearchChange(t){this.prevSearch=t,this.search()}onNew(t,i,e){this.subscriptionsArr.push(this.answerService.answerPost$({answer:t,point:Number(i),parent_question:e,answer_img:this.image[e]}).subscribe(t=>{t.answer_img=s.a.IMAGE_BASE_URL+t.answer_img,this.answers[e]||(this.answers[e]=[]),this.answers[e].push(t),this.onClear(e)},this.snackbarService.displayError))}onClear(t){this.addClicked[t]=!1,this.imgSrc[t]="",this.image[t]=null}onUpdate(t,i,e,n){this.subscriptionsArr.push(this.answerService.answerPut$(this.answers[n][t]._id,{answer:i,point:Number(e)}).subscribe(s=>{this.answers[n][t].answer=i,this.answers[n][t].point=Number(e)},this.snackbarService.displayError))}onDelete(t,i){this.subscriptionsArr.push(this.answerService.answerDelete$(this.answers[i][t]._id).subscribe(e=>{this.answers[i].splice(t,1)},this.snackbarService.displayError))}onChange(t,i){if("image"!==t[0].type.substring(0,t[0].type.indexOf("/")))return;this.image[i]=t[0];let e=new FileReader;e.readAsDataURL(t[0]),e.onload=t=>{this.imgSrc[i]=e.result}}ngOnDestroy(){this.subscriptionsArr.forEach(t=>t.unsubscribe())}}return t.\u0275fac=function(i){return new(i||t)(r.Mb(c),r.Mb(O.a),r.Mb(u.a),r.Mb(d.a),r.Mb(g.a))},t.\u0275cmp=r.Gb({type:t,selectors:[["app-exam-questions"]],hostBindings:function(t,i){1&t&&r.Zb("paste",(function(t){return i.handleImgPaste(t.clipboardData.files)}),!1,r.mc)},decls:10,vars:1,consts:[[1,"add-question"],["matInput","","placeholder","","type","text",3,"input"],["search",""],["mat-raised-button","","color","primary",1,"question-btn-add",3,"click"],[1,"wrapper"],["class","question-card",4,"ngFor","ngForOf"],[1,"question-card"],[1,"exam-num"],["matInput","","type","number",3,"value","input"],["parentExamNumRef",""],[1,"question-question"],["matInput","","type","text","rows","8",3,"value","input"],["questionRef",""],[1,"question-img"],["mat-card-image","","alt","",3,"src",4,"ngIf"],[1,"answer-header"],[1,"titles"],[1,"answer-title"],[1,"point-title"],[1,"img-title"],[1,"add-wrapper"],["mat-icon-button","","color","primary",3,"click"],["class","wrapper-answer",4,"ngFor","ngForOf"],["class","wrapper-answer",4,"ngIf"],["mat-raised-button","","color","primary",1,"question-btn",3,"disabled","click"],["mat-raised-button","","color","warn",1,"question-btn",3,"click"],["mat-card-image","","alt","",3,"src"],[1,"wrapper-answer"],["matInput","","placeholder","","type","text",3,"value"],["answerInput",""],[1,"point"],["pointInput",""],[1,"img-form-field"],["alt","",3,"src"],[1,"actions"],["mat-icon-button","","color","warn",3,"click"],["matInput","","placeholder","","type","text"],["newAnswerInput",""],["newPointInput",""],[1,"label"],[1,"title"],["type","file",3,"change"],["alt","","class","popUp-image",3,"src",4,"ngIf"],["alt","",1,"popUp-image",3,"src"]],template:function(t,i){if(1&t){const t=r.Sb();r.Rb(0,"div",0),r.Rb(1,"mat-form-field"),r.Rb(2,"mat-label"),r.uc(3,"Search Question"),r.Qb(),r.Rb(4,"input",1,2),r.Zb("input",(function(e){r.nc(t);const n=r.lc(5);return i.onSearchChange(n.value)})),r.Qb(),r.Qb(),r.Rb(6,"button",3),r.Zb("click",(function(t){return i.onQuestionAdd()})),r.uc(7,"Add question"),r.Qb(),r.Qb(),r.Rb(8,"div",4),r.tc(9,E,36,6,"mat-card",5),r.Qb()}2&t&&(r.Bb(9),r.ic("ngForOf",i.questionsToShow))},directives:[b.b,b.e,l.a,p.a,n.i,y,Q,n.j,C,R.a,k,P],styles:[".add-question[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.add-question[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-left:10px;margin-top:1%}.add-question[_ngcontent-%COMP%]   .question-btn-add[_ngcontent-%COMP%]{margin-right:2.5%;margin-top:1%}.wrapper[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;-webkit-box-pack:space-evenly;justify-content:space-evenly}.question-card[_ngcontent-%COMP%]{position:relative;width:420px;height:635px;margin:5px}.question-card[_ngcontent-%COMP%]   .question-img[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:block;width:40%;max-height:200px;margin:0 auto;position:absolute;top:10px;right:10px;-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}.question-card[_ngcontent-%COMP%]   .question-img[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:hover{-webkit-transform:scale(2.5);transform:scale(2.5);z-index:100}.question-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{display:block}.question-card[_ngcontent-%COMP%]   .exam-num[_ngcontent-%COMP%]{margin:0}.question-card[_ngcontent-%COMP%]   .question-question[_ngcontent-%COMP%]{word-wrap:break-word;width:55%;height:200px}.question-card[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]{position:absolute;right:15px;bottom:15px}mat-card-content[_ngcontent-%COMP%]{position:absolute;top:35%;left:20px;width:100%}.answer-header[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;width:90%}.answer-header[_ngcontent-%COMP%]   .titles[_ngcontent-%COMP%]{display:-webkit-box;display:flex;text-align:center;-webkit-box-align:center;align-items:center}.answer-header[_ngcontent-%COMP%]   .answer-title[_ngcontent-%COMP%]{width:185px}.answer-header[_ngcontent-%COMP%]   .point-title[_ngcontent-%COMP%]{width:30px;margin-left:12px}.answer-header[_ngcontent-%COMP%]   .img-title[_ngcontent-%COMP%]{width:30px;margin-left:35px}.wrapper-answer[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;width:400px;height:55px}.wrapper-answer[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-left:20px}.point[_ngcontent-%COMP%]{width:30px}input[type=file][_ngcontent-%COMP%]{outline:0;opacity:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.label[_ngcontent-%COMP%]{width:100%;height:50px;padding-top:1%;-webkit-transition:border .3s ease;transition:border .3s ease;cursor:pointer;text-align:center}.label[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:grey;-webkit-transition:color .2s;transition:color .2s}.img-form-field[_ngcontent-%COMP%]{display:-webkit-box;display:flex;width:30px;height:30px}.img-form-field[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{display:block;width:30px;height:30px}.img-form-field[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-left:10px;max-height:30px;max-width:40px;-webkit-transition:-webkit-transform .1s;transition:-webkit-transform .1s;transition:transform .1s;transition:transform .1s,-webkit-transform .1s}.img-form-field[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{z-index:100;-webkit-transform:scale(8);transform:scale(8)}.img-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:none}"]}),t})();var N=e("3Pt+");e.d(i,"QuestionModule",(function(){return Z}));const B=[{path:"",component:h},{path:":id",component:T}];let Z=(()=>{class t{}return t.\u0275mod=r.Kb({type:t}),t.\u0275inj=r.Jb({factory:function(i){return new(i||t)},providers:[d.a,c,O.a],imports:[[n.b,g.e.forChild(B),f.a,p.b,l.b,M,R.b,N.g]]}),t})()}}]);