import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FuseWidgetComponent } from './widget.component';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    imports     : [
        SharedModule
    ],
    exports     : [
        FuseWidgetComponent,
        FuseWidgetToggleDirective
    ],
    declarations: [
        FuseWidgetComponent,
        FuseWidgetToggleDirective
    ]
})
export class FuseWidgetModule
{
}
