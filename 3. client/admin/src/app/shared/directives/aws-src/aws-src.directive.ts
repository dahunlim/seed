import {AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from '../../../../environments/environment';

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
export class AwsSrcDirective implements AfterViewInit, OnChanges{

  @Input('awsSrc') imageSrc: ImageSrc;
  @Input('type') type: string = 'file';
  @Input('size') size: string = 'thumbnail';

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const image = changes.imageSrc;
    this.load(image.currentValue);
  }

  private load(imageSrc: ImageSrc): any {
    if (imageSrc) {
      let src = '';
      if (imageSrc.state === IMAGE_STATE.SOURCE) {
        src = `${environment.AWS_S3_MEDIA_TEMP_URL}${imageSrc.key}`;
      } else {
        src = `${environment.AWS_S3_MEDIA_URL}${this.type}/${imageSrc.key}`;
        if (this.size === 'thumbnail') {
          src += '-thumbnail';
        }
      }
      this.element.nativeElement.src = src;
    }
  }
}
