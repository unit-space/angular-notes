import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isSidenoteSelected, SidenotesState} from '../../store/sidenotes.reducer';
import * as sidenotesActions from '../../store/sidenotes.actions';
import {Subject, takeUntil} from 'rxjs';
import {NgxSidenotesService} from '../../ngx-sidenotes.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'lib-ngx-sidenotes-anchor-base',
  templateUrl: 'ngx-sidenotes-anchor-base.component.html',
  styleUrls: ['ngx-sidenotes-anchor-base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxSidenotesAnchorBaseComponent implements AfterViewInit, OnDestroy {
  @Input() anchor: string = '';
  @Input() className: string = '';
  @ViewChild('baseAnchor') baseAnchor: ElementRef | undefined;
  private alive$: Subject<void> = new Subject<void>();

  constructor(
    private service: NgxSidenotesService,
    private store: Store<SidenotesState>,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewInit() {
    const docId: string = this.service.getDoc(this.baseAnchor?.nativeElement);
    const baseAnchorId: string = uuidv4();
    this.renderer.setAttribute(this.baseAnchor?.nativeElement, 'id', baseAnchorId);
    this.store.pipe(
      select(isSidenoteSelected, {docId, sidenoteId: this.anchor}),
      takeUntil(this.alive$),
    ).subscribe(() => {

    });
    this.store.dispatch(sidenotesActions.connectAnchorBase({docId, anchorId: this.anchor, element: baseAnchorId}));
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }
}
