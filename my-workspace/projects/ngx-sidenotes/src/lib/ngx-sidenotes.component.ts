import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SidenotesState, ifDocExist} from './store/sidenotes.reducer';
import * as sidenotesActions from './store/sidenotes.actions';

@Component({
  selector: 'lib-ngx-sidenotes',
  template: '<div #content><ng-content></ng-content></div>',
  styleUrls: ['ngx-sidenotes.component.scss']
})
export class NgxSidenotesComponent implements OnInit, AfterViewInit {
  @Input() docId = '';
  @ViewChild('content') content: ElementRef | undefined;
  @HostListener('click', ['$event.target']) onClick(elm: HTMLElement) {
    const parentWrapper = elm.closest('lib-ngx-sidenotes');
    parentWrapper && (console.log('Click ', parentWrapper.getAttribute('data-docid')));

    // console.log('ClickParent ', elm.getAttribute('data-docid'));
  }

  constructor(
    private store: Store<SidenotesState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(ifDocExist, this.docId)).subscribe((resp: boolean) => {
      !resp && this.store.dispatch(sidenotesActions.connectSidenote({docId: this.docId, sidenoteId: this.docId}));
    });
  }

  ngAfterViewInit() {
    // const anchors = this.content?.nativeElement.children;
    this.content?.nativeElement.childNodes.forEach((el: any) => {
      console.log('EL ', el);
    });
    // console.log('Content2 ', this.content?.nativeElement.childNodes);
    // console.log('Content2 ', anchors);
  }

}
