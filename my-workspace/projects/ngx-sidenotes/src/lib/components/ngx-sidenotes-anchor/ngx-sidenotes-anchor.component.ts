import {AfterViewInit, Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ifDocExist, SidenotesState} from '../../store/sidenotes.reducer';
import * as sidenotesActions from '../../store/sidenotes.actions';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'lib-ngx-sidenotes-anchor',
  templateUrl: 'ngx-sidenotes-anchor.component.html',
  styleUrls: ['ngx-sidenotes-anchor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxSidenotesAnchorComponent implements OnInit, AfterViewInit {
  @Input() sidenoteId: string = '';
  @ViewChild('anchor') anchor: ElementRef | undefined;

  constructor(
    private store: Store<SidenotesState>
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const parentWrapper = this.anchor?.nativeElement.closest('lib-ngx-sidenotes');
    const docId: string = parentWrapper.getAttribute('data-docid') || 'some';
    this.store.pipe(select(ifDocExist, docId)).subscribe((resp: boolean) => {
      if (resp) {
        this.store.dispatch(sidenotesActions.connectAnchor({docId, sidenoteId: this.sidenoteId, anchorId: uuidv4()}));
      }
    });
  }
}
