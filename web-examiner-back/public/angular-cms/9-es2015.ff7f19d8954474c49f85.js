(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{rQH4:function(t,e,n){"use strict";n.r(e);var i=n("ofXK"),r=n("fXoL"),a=n("tk/3");let s=(()=>{class t{constructor(t){this.httpClient=t,this.urlSuffix="/writtenexam"}writtenExamsGet$(){return this.httpClient.get(this.urlSuffix)}writtenExamDelete$(t){return this.httpClient.delete(this.urlSuffix+"/"+t)}}return t.\u0275fac=function(e){return new(e||t)(r.Vb(a.b))},t.\u0275prov=r.Ib({token:t,factory:t.\u0275fac}),t})();var o=n("S+vS"),c=n("4xmj"),b=n("kmnG"),w=n("qFsG"),m=n("bTqV");function h(t,e){if(1&t){const t=r.Sb();r.Rb(0,"div",4),r.Rb(1,"div",5),r.Rb(2,"strong"),r.uc(3,"Exam #:"),r.Qb(),r.uc(4),r.Qb(),r.Rb(5,"div",6),r.Rb(6,"strong"),r.uc(7,"Username:"),r.Qb(),r.uc(8),r.Qb(),r.Rb(9,"div",6),r.Rb(10,"strong"),r.uc(11,"Email:"),r.Qb(),r.uc(12),r.Qb(),r.Rb(13,"div",5),r.Rb(14,"strong"),r.uc(15,"Score:"),r.Qb(),r.uc(16),r.Qb(),r.Rb(17,"div",7),r.Rb(18,"strong"),r.uc(19,"Date:"),r.Qb(),r.uc(20),r.ec(21,"date"),r.Qb(),r.Rb(22,"div",8),r.Rb(23,"button",9),r.Zb("click",(function(n){r.nc(t);const i=e.index;return r.dc().onDelete(i)})),r.uc(24,"Delete"),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=e.$implicit;r.Bb(4),r.wc(" ",t.exam_num,""),r.Bb(4),r.wc(" ",t.user.username,""),r.Bb(4),r.wc(" ",t.user.email,""),r.Bb(4),r.wc(" ",t.score,""),r.Bb(4),r.wc(" ",r.fc(21,5,t.createDate),"")}}let l=(()=>{class t{constructor(t,e,n){this.writtenExamService=t,this.dialogService=e,this.snackbarService=n,this.writtenExams=[],this.writtenExamsToShow=[],this.prevSearch="",this.subscriptionsArr=[]}ngOnInit(){this.getWrittenExams()}getWrittenExams(){this.subscriptionsArr.push(this.writtenExamService.writtenExamsGet$().subscribe(t=>{this.writtenExams=t,this.onSearchChange("")}))}onDelete(t){this.subscriptionsArr.push(this.dialogService.openConfirmDialog().subscribe(e=>{e&&this.writtenExamService.writtenExamDelete$(this.writtenExamsToShow[t]._id).subscribe(e=>{this.writtenExams=this.writtenExams.filter(e=>e._id!==this.writtenExamsToShow[t]._id),this.search()},this.snackbarService.displayError)}))}search(){this.writtenExamsToShow=[...this.writtenExams],this.writtenExamsToShow=this.writtenExams.filter(t=>t.exam_num==Number(this.prevSearch)||t.user.username.toLowerCase().includes(this.prevSearch.toLowerCase())||t.user.email.toLowerCase().includes(this.prevSearch.toLowerCase()))}onSearchChange(t){this.prevSearch=t,this.search()}ngOnDestroy(){this.subscriptionsArr.forEach(t=>t.unsubscribe())}}return t.\u0275fac=function(e){return new(e||t)(r.Mb(s),r.Mb(o.a),r.Mb(c.a))},t.\u0275cmp=r.Gb({type:t,selectors:[["app-written-exams"]],decls:7,vars:1,consts:[[1,"written-exam-header"],["matInput","","placeholder","","type","text",3,"input"],["search",""],["class","wrapper-written-exam",4,"ngFor","ngForOf"],[1,"wrapper-written-exam"],[1,"written-exam-info-very-small"],[1,"written-exam-info-small"],[1,"written-exam-info"],[1,"written-exam-info","written-exam-info-btn"],["mat-raised-button","","color","warn",1,"written-exam-btn",3,"click"]],template:function(t,e){if(1&t){const t=r.Sb();r.Rb(0,"div",0),r.Rb(1,"mat-form-field"),r.Rb(2,"mat-label"),r.uc(3,"Search..."),r.Qb(),r.Rb(4,"input",1,2),r.Zb("input",(function(n){r.nc(t);const i=r.lc(5);return e.onSearchChange(i.value)})),r.Qb(),r.Qb(),r.Qb(),r.tc(6,h,25,7,"div",3)}2&t&&(r.Bb(6),r.ic("ngForOf",e.writtenExamsToShow))},directives:[b.b,b.e,w.a,i.i,m.a],pipes:[i.d],styles:[".wrapper-written-exam[_ngcontent-%COMP%]{position:relative;display:-webkit-box;display:flex;height:3%;padding:5px;width:95%;margin:1.5% auto;background-color:rgba(0,0,0,.03);-webkit-box-align:center;align-items:center}.wrapper-written-exam[_ngcontent-%COMP%]   .written-exam-info[_ngcontent-%COMP%]{-webkit-box-flex:100;flex:100}.wrapper-written-exam[_ngcontent-%COMP%]   .written-exam-info-small[_ngcontent-%COMP%]{-webkit-box-flex:80;flex:80}.wrapper-written-exam[_ngcontent-%COMP%]   .written-exam-info-very-small[_ngcontent-%COMP%]{-webkit-box-flex:30;flex:30}.wrapper-written-exam[_ngcontent-%COMP%]   .written-exam-info-btn[_ngcontent-%COMP%]{-webkit-box-flex:8;flex:8;position:absolute;right:0}.wrapper-written-exam[_ngcontent-%COMP%]   .written-exam-btn[_ngcontent-%COMP%]{height:15px;width:25px;font-size:10px;line-height:7px}.wrapper-written-exam[_ngcontent-%COMP%]   .status-text[_ngcontent-%COMP%]{font-weight:700;margin-right:5px;display:inline-block;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.written-exam-header[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{margin-left:2.5%;margin-top:1%}"]}),t})();var x=n("tyNb"),u=n("PCNd");n.d(e,"WrittenExamsModule",(function(){return f}));const p=[{path:"",component:l}];let f=(()=>{class t{}return t.\u0275mod=r.Kb({type:t}),t.\u0275inj=r.Jb({factory:function(e){return new(e||t)},providers:[s],imports:[[i.b,x.e.forChild(p),u.a,m.b,w.b]]}),t})()}}]);