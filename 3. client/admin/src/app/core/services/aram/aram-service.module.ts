import {NgModule} from '@angular/core';
import {DaumService} from './daum.service';
import {HttpService} from './http.service';
import {SessionService} from './session.service';
import {UploadService} from './upload.service';

@NgModule({
  providers: [
    DaumService,
    HttpService,
    SessionService,
    UploadService
  ]
})
export class AramServiceModule { }

