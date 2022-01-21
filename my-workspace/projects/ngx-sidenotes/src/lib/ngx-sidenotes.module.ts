import { NgModule } from '@angular/core';
import { NgxSidenotesComponent } from './ngx-sidenotes.component';
import { StoreModule } from '@ngrx/store';
import {sidenotesReducer} from './store/sidenotes.reducer';
import {SidenoteDirective} from './directives/sidenote.directive';
import {NgxSidenotesAnchorComponent} from './components/ngx-sidenotes-anchor/ngx-sidenotes-anchor.component';
import {NgxSidenotesBlockComponent} from './components/ngx-sidenotes-block/ngx-sidenotes-block.component';

@NgModule({
  declarations: [
    NgxSidenotesComponent,
    NgxSidenotesAnchorComponent,
    NgxSidenotesBlockComponent,
    SidenoteDirective,
  ],
  imports: [
    StoreModule.forFeature('sidenotes', sidenotesReducer),
  ],
  exports: [
    NgxSidenotesComponent,
    NgxSidenotesAnchorComponent,
    NgxSidenotesBlockComponent,
    SidenoteDirective
  ]
})
export class NgxSidenotesModule { }
