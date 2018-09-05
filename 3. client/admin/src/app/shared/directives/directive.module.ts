import {NgModule} from '@angular/core';
import {AwsProfileDirective} from './aws-src/aws-profile.directive';
import {AwsSrcDirective} from './aws-src/aws-src.directive';
import {FuseIfOnDomDirective} from './fuse-if-on-dom/fuse-if-on-dom.directive';
import {FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective} from './fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.directive';
import {FuseMatSidenavHelperService} from './fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import {FusePerfectScrollbarDirective} from './fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {GrantIfDirective} from './grant-if/grant-if.directive';

@NgModule({
  imports: [
  ],
  declarations: [ //
    AwsProfileDirective,
    AwsSrcDirective,
    FuseIfOnDomDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective,
    GrantIfDirective
  ],
  exports: [ //
    AwsProfileDirective,
    AwsSrcDirective,
    FuseIfOnDomDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective,
    GrantIfDirective
  ],
  providers: [
    FuseMatSidenavHelperService
  ]
})
export class DirectiveModule {

}
