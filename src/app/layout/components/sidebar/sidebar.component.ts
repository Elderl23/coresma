import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router) {
    }

    openMenuMovil(){
        console.log("pasamos");
        
        let overlay = document.getElementsByClassName('mobile_nav_items')[0];
        overlay.classList.toggle('active');
       }

    ngOnInit() {
    }

}
