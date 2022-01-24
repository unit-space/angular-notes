import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {sidenotesReducer} from './store/sidenotes.reducer';
import {NgxSidenotesAnchorComponent} from './components/ngx-sidenotes-anchor/ngx-sidenotes-anchor.component';
import {NgxSidenotesBlockItemComponent} from './components/ngx-sidenotes-block-item/ngx-sidenotes-block-item.component';
import {
  NgxSidenotesAnchorBaseComponent
} from './components/ngx-sidenotes-anchor-base/ngx-sidenotes-anchor-base.component';

@NgModule({
  declarations: [
    NgxSidenotesAnchorComponent,
    NgxSidenotesAnchorBaseComponent,
    NgxSidenotesBlockItemComponent,
  ],
  imports: [
    StoreModule.forFeature('sidenotes', sidenotesReducer),
  ],
  exports: [
    NgxSidenotesAnchorComponent,
    NgxSidenotesAnchorBaseComponent,
    NgxSidenotesBlockItemComponent,
  ]
})
export class NgxSidenotesModule {
}
