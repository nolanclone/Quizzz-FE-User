import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Record } from "app/model/record";
import { RecordAnswer } from "app/model/record-answer";
import { ExamService } from "app/service/exam.service";
import { RecordService } from "app/service/record.service";
import { data } from "jquery";
import { element } from "protractor";

@Component({
selector: 'icons-cmp',
moduleId: module.id,
templateUrl: 'examination.component.html'
})



export class IconsComponent implements OnInit{


    @Input()
    inId: number;
    timeLeft;    
    currentExam : any = {
        id: 0,
        is_release: true,
        duration: 15,
        exam_code: "",
        exam_name: "",
        quizSet: []
    }

    errorMessage = '';
    isChecked = false;
    isSubmitted = false;

    userAnswers : FormGroup;
    answersArray =  [];
    answersArrayMulti = [];

   

    constructor(private examService: ExamService, private router: Router
                ,private activateRoute: ActivatedRoute, private fb: FormBuilder ,
                private recordService: RecordService) {}


    ngOnInit() {
    
        const id = Number.parseInt(this.activateRoute.snapshot.paramMap.get('id'));
        this.examService.getById(id).subscribe(data => {    
            this.currentExam = data;
            this.answersArray = new Array(this.currentExam.quizSet.length);
            console.log(data);
            this.interval = setInterval(() => {
                if (data.duration > 0) {
                  data.duration--;
                  this.timeLeft = data.duration;
                  if (this.timeLeft === 0) if (confirm("Time out")) this.submit();
                }
              }, 1000);
        });
        // if(this.inId > 0) this.examService.getById(this.inId).subscribe(res => this.currentExam = res);
        this.userAnswers = this.fb.group({})
        
    }

    submit() {
        let examRecord : Record = {
            exam: {},
            recordAnswer: []
        };
        examRecord.exam.id = this.currentExam.id;
        this.currentExam.quizSet.forEach(element => {
            if(element.take_answer != null) {
                examRecord.recordAnswer.push(element.take_answer);
                this.isChecked = true;    
            }
        });
        if(this.isChecked) {
            this.recordService.createRecord(examRecord).subscribe(
                res => {
                    console.log(res);
                    this.isSubmitted = true;
                    this.router.navigateByUrl('/record');
                },
                err => {
                    console.log(err);
                    this.isSubmitted = false;
                }
            )
        } else {
            this.errorMessage = "Please check all question's answer to finish exam";
        }
        
    }

    cancel() {
        this.router.navigateByUrl('')
    }

    selectAnswers(answer_id, quiz) {
        quiz.take_answer = answer_id;
        console.log(this.currentExam);
    }

    interval: NodeJS.Timeout;

    pauseTimer() {
        clearInterval(this.interval);
      }
}
