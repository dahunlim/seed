import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Directive({
  selector: '[grantIf]'
})
export class GrantIfDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private sessionService: SessionService
  ){}

  @Input() set grantIf(levelArr: number[]) {
    if (levelArr.indexOf(this.sessionService.getValue('userLevel')) > -1) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
