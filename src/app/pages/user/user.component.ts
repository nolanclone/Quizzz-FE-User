import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

  currentUser = null;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute
  ){}

    ngOnInit(){
      this.getCurrentUser();
    }

    getCurrentUser(): void {
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.currentUser = data;
          debugger
        },
        (error) => {
          console.log(error);
        }
      );
    }
}
