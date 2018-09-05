import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { FuseSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        FuseSearchBarComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FuseSearchBarComponent
    ]
})
export class FuseSearchBarModule
{
}
