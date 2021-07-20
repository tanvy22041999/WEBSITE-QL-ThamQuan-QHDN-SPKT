import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/theme/css/main.css']
})
export class LoginComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  showPassLogin = false;
  listRoles = [
    { id: SystemConstant.ROLE.ADMIN, title: { vi: 'Quản trị viên', en: 'Administrator' } },
    { id: SystemConstant.ROLE.LECTURER, title: { vi: 'Giảng viên', en: 'Lecturer' } },
    { id: SystemConstant.ROLE.STUDENT, title: { vi: 'Sinh viên', en: 'Student' } },
    { id: SystemConstant.ROLE.GUIDE, title: { vi: 'Hướng dẫn đoàn', en: 'Guide' } },
    { id: SystemConstant.ROLE.BUSINESS, title: { vi: 'Doanh nghiệp', en: 'Business' } },
  ];
  selectedRoleId: string = null;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private formValidatorSvc: FormValidatorService,
    private authSvc: AuthenticateService,
    private socialLoginSvc: SocialAuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    const savedRole = localStorage.getItem('savedRole');
    if (savedRole && this.listRoles.map(x => x.id).includes(savedRole)) {
      this.selectedRoleId = savedRole;
    } else {
      this.selectedRoleId = SystemConstant.ROLE.STUDENT;
      localStorage.setItem('savedRole', SystemConstant.ROLE.STUDENT);
    }
    this.createFormGroupLogin();
  }

  createFormGroupLogin(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  savingChangedRole(role: string): void {
    localStorage.setItem('savedRole', role);
  }

  toggleShowPassLogin(): void {
    this.showPassLogin = !this.showPassLogin;
  }

  onLoginWithForm(): void {
    if (this.form.valid) {
      this.authSvc.doLoginForm(this.selectedRoleId, this.form.value)
        .subscribe(res => {
          this.authSvc.setAuthData(res);
          // this.router.navigateByUrl(
          //   this.selectedRoleId === SystemConstant.ROLE.ADMIN ?
          //     UrlConstant.ROUTE.MANAGEMENT.DASHBOARD : UrlConstant.ROUTE.MAIN.HOME);
          this.router.navigateByUrl(UrlConstant.ROUTE.MAIN.HOME);
        });
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  onLoginWithGoogle(): void {
    this.socialLoginSvc.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.spinner.show();
        if (user) {
          this.authSvc.doLoginGoogle(this.selectedRoleId, user.idToken)
            .subscribe(res => {
              this.authSvc.setAuthData(res);
              this.router.navigateByUrl(
                this.selectedRoleId === SystemConstant.ROLE.ADMIN ?
                  UrlConstant.ROUTE.MANAGEMENT.DASHBOARD : UrlConstant.ROUTE.MAIN.HOME);
              this.spinner.hide();
            }, () => this.spinner.hide());
        }
      });
  }

}
