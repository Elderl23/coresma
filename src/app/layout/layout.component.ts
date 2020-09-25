import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_redux/spinner/interface';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    public spinner: boolean = false;

    constructor(private store: Store<AppState>) { }

    ngOnInit() { 
        this.store.select('spinner').subscribe(
            spinner =>{
                this.spinner = spinner;
            }
        );
     }

    openMenuMovil() {
        let overlay = document.getElementsByClassName('mobile_nav_items')[0];
        overlay.classList.toggle('active');
    }
}
