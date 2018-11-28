import {BasicComponent} from './BasicComponent';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {OnInit, ViewChild} from '@angular/core';
import {IModel} from '../model/interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormHelper} from '../helper/form';
import {IResponse, RESPONSE_CODE} from '../helper/response';
import {AwsApiService} from '../api/aws-api.service';
import {IMAGE_STATE, ImageSrc} from '../../shared/directive/aws-src.directive';

export abstract class FormComponent extends BasicComponent implements OnInit {

  public form: FormGroup;
  public formErrors: any = {};
  public item: IModel;

  protected constructor(protected formBuilder: FormBuilder, protected controlsConfig: any, protected aws: AwsApiService, protected dialog: MatDialog) {
    super();
    this.form = formBuilder.group(controlsConfig);
    Object.keys(controlsConfig).forEach(key => this.formErrors[key] = {});
  }

  ngOnInit(): void {
    this.subs$.push(FormHelper.formChangeHandler(this.form, this.formErrors));
    this.setSelector();
  }

  uploadFile(type, event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.aws.getUploadUrl()
        .subscribe((res: IResponse<any>) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.aws.upload(res.data.url, file).subscribe((rs) => {
              this.uploaded(type, {key: res.data.key, state: IMAGE_STATE.SOURCE});
            });
          } else {
            console.log('Confirm', 'Failed to get upload url');
            /*this.dialog.open(FuseAlertDialogComponent, {
              data: {
                message: 'Failed to get upload url',
                ok: 'Confirm'
              }
            });*/
          }
        });
    }
  }

  abstract setSelector(): void;
  abstract add(): void;
  abstract modify(): void;
  abstract uploaded(type: string, image: ImageSrc): void;
}
