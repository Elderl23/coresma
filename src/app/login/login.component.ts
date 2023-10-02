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

  datainfo: any;

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

    this.afAuth.auth.onAuthStateChanged((user: any) => {
      console.log("onAuthStateChanged");

      if (user) {
        console.log("ok1");

        let data = {
          "email": user.email,
          "details": {
            "nombre": user.displayName
          },
          "uuid": user.uid
        }

        this.datainfo = data
        console.log("cerramos6");
        sessionStorage.setItem('token', user.xa)
        this.ngZone.run(() => {
          console.log("ok1");



          this.router.navigate(['/dashboard']);
        })
      }
    });


  }

  get userNameNoValido() {
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordNoValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  private saveData(data) {
    this.authenticationService.createUserCore(data)
      .subscribe(
        data => {
          console.log("Guardado correctamenete en e core");

        },
        error => {
          console.log(error);
        });
  }

  private updateUUID(data){
    this.authenticationService.updateUserUUIDCore(data.email,data)
      .subscribe(
        data => {
          console.log("Actualziado correctamenete en e core");

        },
        error => {
          console.log(error);
        });
  }

  private getEmail(paramter) {
    this.authenticationService.getUserCore(paramter.email)
      .subscribe(
        data => {

          console.log(paramter);
          
          console.log("Guardado correctamenete en e core");

          this.updateUUID(paramter)

        },
        error => {
          this.saveData(paramter)
        });
  }


  public ingresar(type): void {
    // this.authenticationService.loginSocial(type);

    
    this.authenticationService.AuthLogin().then((res: any) => {

      let data = {
        "email": res.additionalUserInfo.profile.email,
        "details": {
          "nombre": res.additionalUserInfo.profile.name
        },
        "uuid": res.user.uid
      }

      this.getEmail(data)


      

    });


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
          (data: any) => {
            console.log("cerramos7");
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
            console.log("cerramos3");
            sessionStorage.removeItem('token');
          });

    } else {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      }
      )
    }

  }

  ngOnInit() { }

  onLoggedin() {
  }
}
