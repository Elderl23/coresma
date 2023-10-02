import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_redux/spinner/interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

    public spinner: any;

    constructor(
        private store: Store<AppState>,
        private cdr: ChangeDetectorRef
    ) { }



    ngAfterViewInit() {
        this.store.select('spinner').subscribe(
            spinner => {
                this.spinner = spinner;
                this.cdr.detectChanges();
            }
        );
    }

    openMenuMovil() {
        let overlay = document.getElementsByClassName('mobile_nav_items')[0];
        overlay.classList.toggle('active');
    }
}
