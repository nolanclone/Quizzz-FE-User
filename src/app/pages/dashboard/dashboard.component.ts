import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from 'app/service/record.service';
import Chart from 'chart.js';

interface record {
  id: number,
  exam : {
    exam_name: string,
    exam_code: string,
  },
  user: {
    username: string
  },
  score: number
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  recordList: record[] = []
    constructor(private recordService: RecordService, private router: Router) {}

    ngOnInit(){
      this.getAllRecord();
}

    getAllRecord() {
      this.recordService.getRecordByUser().subscribe(
        data => {
          this.recordList = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    }

    getRecordDetail(id: any) {
      this.router.navigate([`record-detail/${id}`]).then(r => r);
    }



}
