import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/exam-list',     title: 'Explore',         icon:'nc-map-big',       class: '' },
    // { path: '/examination/:id',         title: 'Examination',             icon:'nc-single-copy-04',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/record', title: 'Record', icon:'nc-map-big', class: ''},
    { path: '/typography', title: 'Logout', icon: 'nc-map-big', class: ''} 
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
