import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

interface data {
  category: {
    name: string
  },
  testName: string
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  datas: data[] = []

    ngOnInit(){
      this.datas = [{
        category: {
          name: "Math"
        },
        testName: "a"
      },
      {
        category: {
          name: "Physic"
        },
        testName: "b"
      },
      {
        category: {
          name: "Chemistry"
        },
        testName: "c"
      }  
    ]
}


}
