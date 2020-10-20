import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.afAuth.auth.onAuthStateChanged((user:any) => {
      console.log("onAuthStateChanged");
      
      if (user) {
        console.log("ok1");
        sessionStorage.setItem('token', user.xa)
        this.ngZone.run(() => {
          console.log("ok1");
          
          this.router.navigate(['/dashboard']);
        })
      }
    });


  }

  get userNameNoValido(){
     return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordNoValido(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
 }


 public ingresar(type): void {
  this.authenticationService.loginSocial(type);
}

public refreshToken(type): void {
  this.authenticationService.refreshToken();
}

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.loginForm.value.email = this.loginForm.value.username;
      this.loginForm.value.returnSecureToken = true;
      this.authenticationService.signIn(this.loginForm.value)
        .subscribe(
          (data:any) => {
            sessionStorage.setItem('token', data.idToken)
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard']);
            })

            // console.log("Ok");
            // this.router.navigate(['/dashboard'])
            

            // let token = data.token;
            // sessionStorage.setItem('token', token)
            // this.authenticationService.arbolPermisos()
            //   .subscribe(
            //     data => {
            //       this.router.navigate(['/dashboard'])
            //     },
            //     error => {
            //       console.log(error);
            //       // sessionStorage.removeItem('token');
            //     });
          },
          error => {
            console.log(error);
            sessionStorage.removeItem('token');
          });
      
    } else {
      return Object.values(this.loginForm.controls).forEach( control => {
        control.markAsTouched();
      }
      )
    }

  }

  ngOnInit() {}

  onLoggedin() {
  }
}
