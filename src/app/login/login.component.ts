import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AppComponent } from '../app.component';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  signInForm: FormGroup;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent
  ) {}
  ngAfterViewInit() {
    if (this.appComponent.user) {
      this.router.navigate([this.returnUrl]);
    }
  }
  ngOnInit() {
    this.initializeForms();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  initializeForms() {
    this.signInForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  doLogin() {
    if (this.signInForm.valid) {
      this.userService.signIn(this.signInForm.getRawValue(), true).subscribe((user: UserModel) => {
        if (user) {
            this.router.navigate([this.returnUrl]);
        }
      });
    }
  }
}