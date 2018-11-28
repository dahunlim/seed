import {NgModule} from '@angular/core';
import {AramServiceModule} from './aram/aram-service.module';
import {FuseServiceModule} from './fuse/fuse-service.module';


@NgModule({
  imports: [
    AramServiceModule,
    FuseServiceModule
  ],
  exports: [
    AramServiceModule,
    FuseServiceModule
  ]
})
export class ServiceModule { }

