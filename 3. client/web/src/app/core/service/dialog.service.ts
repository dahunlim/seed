import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material";
import {AppDialogAlertComponent} from "../dialog/alert/alert.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import * as RouterActions from "../router/router.action";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private router: Router
  ) { }

  routeAfterAlert(msg: string, routingAction: RouterActions.All): Observable<RouterActions.All> {
    return Observable.create(subscribe => {
      const Alert = this.dialog.open(AppDialogAlertComponent, {
        data: {
          message: msg,
          ok: "확인"
        }
      });

      Alert.afterClosed().subscribe(rs => {
        subscribe.next(routingAction);
      })
    }).subscribe();
  }


  alert(msg: string, type?: string) {
    const Alert = this.dialog.open(AppDialogAlertComponent, {
      data: {
        message: msg,
        ok: "확인"
      }
    });

    Alert.afterClosed().subscribe(rs => {
      switch (type) {
        case "login":
          this.location.go("/login");
          break;
        case "back":
          this.location.back();
          break;
        default:
      }
    })
  }
}
