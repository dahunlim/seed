import {Component} from "@angular/core";
import {SpinnerService} from "./spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  inLoading: boolean = false;
  constructor(public spinnerService: SpinnerService) {
    this.spinnerService.inLoading.subscribe(inLoading => this.inLoading = inLoading);
  }
}

