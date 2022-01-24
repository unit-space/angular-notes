import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isSidenoteSelected, SidenotesState} from '../../store/sidenotes.reducer';
import * as sidenotesActions from '../../store/sidenotes.actions';
import {v4 as uuidv4} from 'uuid';
import {NgxSidenotesService} from "../../ngx-sidenotes.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'lib-ngx-sidenotes-anchor',
  templateUrl: 'ngx-sidenotes-anchor.component.html',
  styleUrls: ['ngx-sidenotes-anchor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxSidenotesAnchorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sidenoteId: string = '';
  @ViewChild('anchor') anchor: ElementRef | undefined;
  anchorId: string;
  docId: string;
  private alive$: Subject<void> = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private store: Store<SidenotesState>,
    private service: NgxSidenotesService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.docId = this.service.getDoc(this.anchor?.nativeElement);
    this.anchorId = uuidv4();
    this.renderer.setAttribute(this.anchor?.nativeElement, 'id', this.anchorId);
    this.store.pipe(
      select(isSidenoteSelected, {docId: this.docId, sidenoteId: this.sidenoteId}),
      takeUntil(this.alive$),
    ).subscribe(resp => {
      this.renderer[`${resp ? 'add' : 'remove'}Class`](this.anchor?.nativeElement, 'selected');
    });
    this.store.dispatch(sidenotesActions.connectAnchor({docId: this.docId, sidenoteId: this.sidenoteId,
      anchorId: this.anchorId, element: this.anchorId}));
  }

  selectAnchore(e: MouseEvent): void {
    e.stopPropagation();
    this.store.dispatch(sidenotesActions.selectAnchor({docId: this.docId, anchorId: this.anchorId}));
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }
}
