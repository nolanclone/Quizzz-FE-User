import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Record } from "app/model/record";
import { RecordAnswer } from "app/model/record-answer";
import { ExamService } from "app/service/exam.service";
import { RecordService } from "app/service/record.service";
<<<<<<< HEAD
import { timeStamp } from 'console';
import { data } from "jquery";
import { element } from "protractor";
=======
import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";
>>>>>>> record-detail

@Component({
  selector: "icons-cmp",
  moduleId: module.id,
  templateUrl: "examination.component.html",
})



export class IconsComponent implements OnInit{


    @Input()
    inId: number;   
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

    countDown: Subscription;
    tick = 1000;

    constructor(private examService: ExamService, private router: Router
                ,private activateRoute: ActivatedRoute, private fb: FormBuilder ,
                private recordService: RecordService) {}


    ngOnInit() {
    
        const id = Number.parseInt(this.activateRoute.snapshot.paramMap.get('id'));
        this.examService.getById(id).subscribe(data => {    
            this.currentExam = data;
            this.answersArray = new Array(this.currentExam.quizSet.length);
            this.countDown = timer(0, this.tick).subscribe(() => --data.duration * 60);
            console.log(data);
            
            
            
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
<<<<<<< HEAD
        )
        this.pauseTimer()
=======
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
        
>>>>>>> record-detail
    }

    cancel() {
        this.router.navigateByUrl('')
    }

    selectAnswers(answer_id, quiz) {
        quiz.take_answer = answer_id;
        console.log(this.currentExam);
    }

    // interval: NodeJS.Timeout;

    // pauseTimer() {
    //     clearInterval(this.interval);
    //   }
}

@Pipe({
    name: "formatTime"
  })
  export class FormatTimePipe implements PipeTransform {
    transform(value: number): string {
      const minutes: number = Math.floor(value / 60);
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
  }
