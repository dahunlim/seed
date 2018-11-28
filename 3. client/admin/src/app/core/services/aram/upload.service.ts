import {Injectable} from '@angular/core';
import {forkJoin, Observable, Subject} from 'rxjs';
import {AwsApiService} from '../../apis/aws-api.service';
import {IResponse, RESPONSE_CODE} from '../../helpers/response';
import {HttpEventType, HttpResponse} from '../../../../../node_modules/@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {zip} from 'rxjs/operators';

@Injectable()
export class UploadService {

  public FileMap: {[key: string]: {url: string, progress: Subject<number>, file: {key: string, name: string, data: File}, sub$: any}} = {};
  public fileAdded: Subject<{progress: Subject<number>, file: {key: string, name: string, data: File}}> = new Subject();
  public uploadState: Subject<number> = new Subject();

  constructor(private awsApiService: AwsApiService, private snackBar: MatSnackBar) {
    this.uploadState.next(0);
  }

  add(file: File): void {
    this.awsApiService.getUploadUrl('file')
      .subscribe((res: IResponse<any>) => {
        if (res.code === RESPONSE_CODE.SUCCESS) {
          const progress = new Subject<number>();
          const fileObj = {key: res.data.key, name: file.name, data: file};
          this.FileMap[file.name] = {
            url: res.data.url,
            progress: progress,
            file: fileObj,
            sub$: null
          };
          this.fileAdded.next({progress: progress, file: fileObj});
        } else {
          this.snackBar.open(`Failed to get upload url of ${file.name}`, 'Confirm', {duration: 1500});
        }
      });
  }

  upload(): void {
    const progressSubjectList: any[] = [];
    this.uploadState.next(1);
    Object.keys(this.FileMap).forEach(key => {
      this.FileMap[key].sub$ = this.awsApiService.upload(this.FileMap[key].url, this.FileMap[key].file.data).subscribe((ev) => {
        console.log(ev);
        if (ev.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * ev.loaded / ev.total);
          this.FileMap[key].progress.next(percentDone);
        } else if (ev instanceof HttpResponse) {
          this.FileMap[key].progress.complete();
        }
      });
      progressSubjectList.push(this.FileMap[key].progress);
    });
    forkJoin(progressSubjectList)
      .subscribe(end => {
        this.uploadState.next(2);
        this.FileMap = {};
      });
  }
}
