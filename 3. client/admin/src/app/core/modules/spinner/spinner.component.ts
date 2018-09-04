import {Component, ElementRef, OnInit} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  spinner$: any;

  constructor(private spinnerService: SpinnerService, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.spinner$ = this.spinnerService.inProgress.subscribe(inProgress => {
      if (inProgress) {
        this.elementRef.nativeElement.style.display = 'block';
      } else {
        this.elementRef.nativeElement.style.display = 'none';
      }
    });
  }
}
