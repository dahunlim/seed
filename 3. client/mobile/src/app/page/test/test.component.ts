import {IonicPage, ToastController} from "ionic-angular";
import {Component} from "@angular/core";
import {BasicComponent} from "../../core/basic/basic.component";
import {Store} from "@ngrx/store";
import {AppStore} from "../../app-store.interface";
import {SessionService} from "../../core/service/session.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/api/auth.service";
import {UserService} from "../../core/api/user.service";
import {User} from "../../core/model/user";
import {FormHelper} from "../../core/helper/form";
import * as RouterActions from "../../core/router/router.action";
import * as AccountActions from "../../core/redux/account/action";
import {IResponse, RESPONSE_CODE} from "../../core/service/response.service";
import {Login} from "../../core/model/login";


@IonicPage({
  name: 'TestComponent',
  segment: 'test'
})
@Component({
  selector: 'page-test-ionic',
  templateUrl: 'test.component.html'
})

export class TestComponent extends BasicComponent{
  private change$: any;
  private userForm: FormGroup;
  private userFormErrors: any;
  private user: User;
  private login: Login;
  private loginForm: FormGroup;
  private loginFormErrors: any;


  selected : string = 'signin'
  constructor(
    protected store: Store<AppStore>,
    protected sessionService: SessionService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private userService: UserService
  ){
    super(store, sessionService, false);
    this.user = new User();
    this.userFormErrors = {
      id: {},
      pass: {},
      name: {},
      phone: {},
    };
    this.userForm = this.formBuilder.group({
      // 1
      id: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      // 2
      name: [''],
      phone: [''],
      // 3
    });
    this.login = new Login();
    this.loginFormErrors = {
      id: {},
      password: {}
    };
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ionViewDidLoad() {
    this.change$ = FormHelper.formChangeHandler(this.userForm, this.userFormErrors);
    this.change$ = FormHelper.formChangeHandler(this.loginForm, this.loginFormErrors);
  }
  ionViewWillEnter() {}

  ionViewWillUnload() {}

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  signin(){
    // console.log(this.loginForm);
    // if (this.loginForm.valid) {
    //   // 로그인 Dispatch
    //   return null;
    // } else {
    //   // 안내
    // }
    const login = this.loginForm.getRawValue();
    // const login_user = new Login(login.id, login.password);
    this.store.dispatch(new AccountActions.AccountLogin(login.id, login.password));
  }

  signup() {
    const rawValue = this.userForm.getRawValue();
    const user = new User(rawValue.id, rawValue.pass, rawValue.name, rawValue.phone, 'SeedProject', null, null, null, true, 1, 'SeedProject');

    // this.subs$.push(
    //   this.userService.exist(rawValue.id).subscribe((res: IResponse<any>) => {
    //     if (res.code === RESPONSE_CODE.SUCCESS) {
    //     } else {
    //       this.toast('중복된 아이디입니다.');
    //     }
    //   })
    // );
    this.store.dispatch(new AccountActions.AccountSignup(user));

  }
}

