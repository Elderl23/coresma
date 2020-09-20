import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor() { }

    ngOnInit() { }

    openMenuMovil() {
        console.log("pasamos");

        let overlay = document.getElementsByClassName('mobile_nav_items')[0];
        overlay.classList.toggle('active');
    }
}
