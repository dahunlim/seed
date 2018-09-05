import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {SessionService} from '../../../../services/aram/session.service';

@Component({
  selector: 'fuse-nav-vertical-item',
  templateUrl: './nav-vertical-item.component.html',
  styleUrls: ['./nav-vertical-item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit {
  @HostBinding("class") classes = "nav-item";
  @Input() item: any;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  isVisible(item: any): boolean {
    if (item.url) {
        if (item.grant) {
          return (item.grant.indexOf(this.sessionService.getValue('userLevel')) > -1) ? true : false;
        } else {
          return false;
        }
    } else {
      return false;
    }
  }
}
