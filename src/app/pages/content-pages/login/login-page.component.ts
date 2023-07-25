import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { AUTH_TOKEN } from 'app/shared/config/constants/auth-constant';
import { PERMISSION_KEYS } from 'app/shared/config/constants/permission-keys';
import { ROLES } from 'app/shared/config/constants/roles';
import { LoginResponse, UserResponse } from 'app/shared/models/login-response';
import { DASHBOARD_ROUTE_MODULE } from 'app/shared/routes/auth-const-routes';
import { StorageService } from 'app/shared/services/storage.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  isLoginFailedMessage: string = "";
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    /*  this.spinner.show(undefined,
       {
         type: 'ball-triangle-path',
         size: 'medium',
         bdColor: 'rgba(0, 0, 0, 0.8)',
         color: '#fff',
         fullScreen: true
       }); */

    const dataToSend = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.authService.signInUser(dataToSend).subscribe((res: LoginResponse) => {
      const result: LoginResponse = res;
      if (result) {
        this.isLoginFailed = false;
        this.storageService.saveToken(result.access_token);
        this.storageService.saveRefreshToken(result.refresh_token);
        const user: UserResponse = {
          userId: result.userId,
          userName: result.fullName,
          email: result.email,
          phoneNo: result.phoneNo,
          customerId: result.customerId,
          customerName: result.customer,
          organizationId: result.orgId,
          organizationName: result.organization,
          roleKeys: result.roleKeys,
          empId: result.empId,
          empName: result.empName,
          permissionKeys: result.permissionKeys
        };

        this.storageService.saveUser(user);
        /*   this.router.navigate(['/page']);
          this.spinner.hide();
        }

      }, (err) => {
        this.isLoginFailedMessage = err;
        this.isLoginFailed = true;
        this.spinner.hide();
      })
    }

  }
   */
        if (user.roleKeys && user.roleKeys?.length > 0 && (user.roleKeys.includes(ROLES.SYSTEM_ADMIN) || user.roleKeys.includes(ROLES.SYSTEM_ADMIN_FZ))) {

          if (user && user?.permissionKeys && user?.permissionKeys?.length > 0) {

            if (user.permissionKeys.includes(PERMISSION_KEYS.DASHBOARD.ESERVICE_ES_SYSTEM_ADMIN)) {
              this.router.navigate([DASHBOARD_ROUTE_MODULE.SYSTEM_ADMIN]);
            } else {
              this.isLoginFailed = true;
              this.isLoginFailedMessage = "No permission keys found for this user, Please contact support team";
            }
          } else {
            this.isLoginFailed = true;
            this.isLoginFailedMessage = "No permission keys found for this user, Please contact support team";
          }
          // this.spinner.hide();
        } else {
          //  this.spinner.hide();
          this.isLoginFailed = true;
          this.isLoginFailedMessage = "You don't have permission to this application";
        }
      } else {
        // this.spinner.hide();
        this.isLoginFailed = true;
        this.isLoginFailedMessage = "There is a connection issue, Please try again later";
      }

    }, (err) => {
      this.isLoginFailedMessage = err;
      this.isLoginFailed = true;
      //  this.spinner.hide();
    })
  }

}
