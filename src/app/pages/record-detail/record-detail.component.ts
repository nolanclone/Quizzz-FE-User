import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'app/service/record.service';
 

 
@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {

  currentRecord : any = {
    exam: {
      quizSet:[]
    },  
    recordAnswers: []
  };

  constructor(private recordService: RecordService, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    const id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recordService.getRecordById(id).subscribe(
      data => {
        this.currentRecord = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )

  }

 


}
