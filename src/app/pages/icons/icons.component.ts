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
  selector: "icons-cmp",
  moduleId: module.id,
  templateUrl: "icons.component.html",
})
export class IconsComponent implements OnInit {
  @Input()
  inId: number;
  timeLeft;
  currentExam: any = {
    id: 0,
    is_release: true,
    duration: 0,
    exam_code: "",
    exam_name: "",
    quizSet: [],
  };

  userAnswers: FormGroup;
  answersArray = [];
  answersArrayMulti = [];

  constructor(
    private examService: ExamService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private recordService: RecordService
  ) {}

  ngOnInit() {
    const id = Number.parseInt(this.activateRoute.snapshot.paramMap.get("id"));
    this.getExamById(id);
    if (this.inId > 0)
      this.examService
        .getById(this.inId)
        .subscribe((res) => (this.currentExam = res));
    this.userAnswers = this.fb.group({});
  }

  getExamById(id) {
    this.examService.getById(id).subscribe(
      (data) => {
        this.currentExam = data;
        console.log(data);
        // this.startTimer(data.duration);
        // this.timeLeft = this.startTimer(data.duration);
        this.interval = setInterval(() => {
          if (data.duration > 0) {
            data.duration--;
            this.timeLeft = data.duration;
            if (this.timeLeft === 0) if (confirm("Time out")) this.submit();
          }
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    let examRecord: Record = {
      exam: {},
      recordAnswer: [],
    };
    examRecord.exam.id = this.currentExam.id;
    this.currentExam.quizSet.forEach((element) => {
      if (element.take_answer != null)
        examRecord.recordAnswer.push(element.take_answer);
    });
    this.recordService.createRecord(examRecord).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel() {}

  selectAnswers(answer_id, quiz) {
    quiz.take_answer = answer_id;
    console.log(this.currentExam);
  }

  //   timeLeft: number = this.currentExam.duration;
  interval: NodeJS.Timeout;

  //   startTimer(timeLeft)  {
  //     this.interval = setInterval(() => {
  //       if (timeLeft > 0) {
  //         timeLeft--;
  //       }
  //     }, 1000);
  //   }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
