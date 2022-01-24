import {
  AfterViewInit,
  Component, ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgxSidenotesService} from '../../ngx-sidenotes.service';
import {select, Store} from '@ngrx/store';
import {isSidenoteSelected, SidenotesState, sidenoteTop} from '../../store/sidenotes.reducer';
import {Subject, takeUntil} from "rxjs";
import * as sidenotesActions from '../../store/sidenotes.actions';

@Component({
  selector: 'lib-ngx-sidenotes-block-item',
  templateUrl: 'ngx-sidenotes-block-item.component.html',
  styleUrls: ['ngx-sidenotes-block-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxSidenotesBlockItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sidenoteId: string = '';
  @Input() base: string;
  @ViewChild('sidenote') sidenote: ElementRef | undefined;
  isSelected = false;
  docId: string;
  private alive$: Subject<void> = new Subject<void>();

  constructor(
    private service: NgxSidenotesService,
    private store: Store<SidenotesState>,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.docId = this.service.getDoc(this.sidenote?.nativeElement);
    this.store.pipe(
      select(isSidenoteSelected, {docId: this.docId, sidenoteId: this.sidenoteId}),
      takeUntil(this.alive$),
    ).subscribe(resp => {
      this.isSelected = resp;
      this.renderer[`${resp ? 'add' : 'remove'}Class`](this.sidenote?.nativeElement, 'selected');
    });
    this.store.pipe(
      select(sidenoteTop, {docId: this.docId, sidenoteId: this.sidenoteId}),
      takeUntil(this.alive$),
    ).subscribe((resp: number) => {
      this.renderer.setStyle(this.sidenote?.nativeElement, 'top', `${resp}px`);
    });
    this.store.dispatch(sidenotesActions.connectSidenote({docId: this.docId, sidenoteId: this.sidenoteId,
      baseId: this.base}));
    this.renderer.setAttribute(this.sidenote?.nativeElement, 'id', this.sidenoteId);
  }

  selectSidenote(e: MouseEvent): void {
    e.stopPropagation();
    if (this.isSelected) return;
    this.store.dispatch(sidenotesActions.selectSidenote({docId: this.docId, sidenoteId: this.sidenoteId}));
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }
}
