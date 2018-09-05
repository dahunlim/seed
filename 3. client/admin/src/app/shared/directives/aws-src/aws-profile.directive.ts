import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Directive({
  selector: '[awsProfile]'
})
export class AwsProfileDirective implements OnChanges {

  @Input('userId') userId: string;
  @Input('size') size: string;

  constructor(private elemRef: ElementRef){}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userId) {
      this.elemRef.nativeElement.src = `${environment.AWS_S3_MEDIA_URL}profile/${this.userId}` + ((this.size === 'thumbnail') ? '-thumbnail' : '');
    }
  }
}
