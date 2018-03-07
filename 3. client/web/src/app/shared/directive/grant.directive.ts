import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {SessionService} from "../../core/service/session.service";

@Directive({
  selector: '[appGrantDirective]'
})
export class AppGrantDirective implements OnInit {
  @Input() appGrantDirective: string;

  private allow: Array<number>;
  private userLevel: number;

  ngOnInit(): void {
    // console.log(`user level is ${this.appGrantDirective}`);
    this.userLevel = this.session.get('userLevel');
    this.allow = JSON.parse(this.appGrantDirective);
    for (const idx in this.allow) {
      if (this.allow[idx] === this.userLevel) {
        this.elem.nativeElement.style.display = '';
        return null;
      }
    }
    this.elem.nativeElement.style.display = 'none';
  }

  constructor(private elem: ElementRef, private session: SessionService) {
    // console.log(elem);
  }
}
