import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/service/token-storage.service';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})

export class TypographyComponent implements OnInit{
    constructor(private tokenService: TokenStorageService, private router: Router ) {}

    ngOnInit() {}

    logOut() {
        this.tokenService.signOut();
        this.router.navigateByUrl("/login");

    }

    cancel(){
        this.router.navigateByUrl("");
    }
    

}

