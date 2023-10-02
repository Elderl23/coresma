import { Component, OnInit,NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    private activateLogout: boolean = false;
    constructor(
        public router: Router,
        private authenticationService: AuthenticationService,
        private afAuth: AngularFireAuth,
        private ngZone: NgZone
        ) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.afAuth.auth.onAuthStateChanged((user) => {
            if (!user) {
              console.log("logout");
              console.log("cerramos3");
              sessionStorage.setItem('token', '')
            //   this.ngZone.run(() => {
            //     console.log("logout");
                
                
            //   })
            }
          });

    }

    logout() {
        this.authenticationService.logout()
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        console.log("cerramos5");
        sessionStorage.removeItem('token');
    }
}
