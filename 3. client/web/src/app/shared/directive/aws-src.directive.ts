import {AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";

export enum IMAGE_STATE {
  SOURCE = 0,
  RELEASE = 1
}

export interface ImageSrc {
  key: string;
  state: IMAGE_STATE;
}

@Directive({
  selector: '[awsSrc]'
})
export class AwsSrcDirective implements AfterViewInit, OnChanges {

  @Input('awsSrc') imageSrc: ImageSrc;
  @Input('type') type: string = 'file';
  @Input('size') size: string = 'thumbnail';

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const image = changes.imageSrc;
    this.load(image.currentValue);
  }

  private load(imageSrc: ImageSrc): any {
    if (imageSrc) {
      if (imageSrc.state === IMAGE_STATE.SOURCE) {
        this.element.nativeElement.src = environment.AWS_S3_MEDIA_TEMP_URL + imageSrc.key;
      } else {
        let postFix = '';
        switch (this.size) {
          case 'small':
            postFix = '_s';
            break;
          case 'medium':
            postFix = '_m';
            break;
          case 'large':
            postFix = '_l';
            break;
          default:
            postFix = '_o'
            break;
        }
        this.element.nativeElement.src = `${environment.AWS_S3_MEDIA_URL + this.type}/${imageSrc.key + postFix}`;
      }
    }
  }
}
