import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
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
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get userNameNoValido(){
     return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordNoValido(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
 }

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.authenticationService.login(this.loginForm.value)
        .subscribe(
          data => {
            let token = data.token;
            sessionStorage.setItem('token', token)
            this.authenticationService.arbolPermisos()
              .subscribe(
                data => {
                  this.router.navigate(['/dashboard'])
                },
                error => {
                  console.log(error);
                  // sessionStorage.removeItem('token');
                });
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
