import {RouterStateSerializer} from '@ngrx/router-store';
import {IRouterStateUrl} from './router.state';
import {RouterStateSnapshot} from '@angular/router';

export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}
