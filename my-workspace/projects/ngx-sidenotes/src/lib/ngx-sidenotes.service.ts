import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {SidenotesState, selectedSidenote} from "./store/sidenotes.reducer";
import * as sidenotesActions from './store/sidenotes.actions';
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgxSidenotesService {

  constructor(
    private store: Store<SidenotesState>,
  ) { }

  getDoc(el: HTMLElement | null): string {
    const doc = el?.closest('article')?.getAttribute('id');
    if (el && !doc) {
      console.warn('Parent doc for comment not found.');
    }
    return doc || 'global';
  }

  deselectSidenote(docId: string): void {
    this.store.pipe(
      select(selectedSidenote, {docId}),
      take(1),
    ).subscribe(resp => {
      if (resp) {
        this.store.dispatch(sidenotesActions.deselectSidenote({docId}));
      }
    });
  }
}
