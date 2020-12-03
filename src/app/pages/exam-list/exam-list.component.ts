import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExamService } from "app/service/exam.service";

@Component({
<<<<<<< HEAD:src/app/pages/exam-list/exam-list.component.ts
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'exam-list.component.html'
=======
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
>>>>>>> origin/nghiavu1:src/app/pages/table/table.component.ts
})
export class TableComponent implements OnInit {


  constructor(private router: Router, private service: ExamService) {}

  public ExamList: any = [];
  ngOnInit() {
    this.getAllExams();
  }

  getAllExams() {
    this.service.getAll().subscribe(
      (data) => {
        this.ExamList = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getExamDetail(id: any) {
    this.router.navigate([`examination/${id}`]).then((r) => r);
  }
}
