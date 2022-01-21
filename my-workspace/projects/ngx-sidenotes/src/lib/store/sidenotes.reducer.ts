import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as sidenotesActions from './sidenotes.actions';
import {ConnectAnchorAction} from "./sidenotes.actions";

export interface SidenotesState {
  ui: {
    docs: {
      [docId: string]: {
        id: string;
        selectedAnchor: string;
        selectedNote: string;
        anchors: {
          [anchorId: string]: {
            id: string;
            sidenote: string;
            element: string;
          };
        };
      };
    };
  };
}

export const initialState: SidenotesState = {
  ui: {
    docs: {},
  },
}

const _sidenotesReducer = createReducer(
  initialState,
  on(sidenotesActions.connectSidenote, (state, payload: sidenotesActions.ConnectSidenoteAction) => ({
    ...state,
    ui: {
      ...state.ui,
      docs: {
        ...state.ui.docs,
        [payload.docId]: {
          id: payload.docId,
          selectedAnchor: '',
          selectedNote: payload.sidenoteId,
          anchors: {},
        }
      }
    }
  })),
  on(sidenotesActions.connectAnchor, (state, payload: sidenotesActions.ConnectAnchorAction) => ({
    ...state,
    ui: {
      ...state.ui,
      docs: {
        ...state.ui.docs,
        [payload.docId]: {
          id: payload.docId,
          selectedAnchor: '',
          selectedNote: payload.sidenoteId,
          anchors: {
            ...state.ui.docs[payload.docId].anchors,
            [payload.anchorId]: {
              id: payload.anchorId,
              sidenote: payload.sidenoteId,
              element: ''
            },
          },
        }
      }
    }
  })),
);

export function sidenotesReducer<T, V extends Action = Action>(state: SidenotesState, action: Action) {
  return _sidenotesReducer(state, action);
}

export const sidenotesStateFeature = createFeatureSelector<SidenotesState>('sidenotes');

export const ifDocExist = createSelector(sidenotesStateFeature,
  (state: SidenotesState, docId: string) => !!state.ui.docs[docId]);
export const getAnchore = createSelector(sidenotesStateFeature,
  (state: SidenotesState, props: {docId: string, anchorId: string}) => state.ui.docs[props.docId]?.anchors[props.anchorId] || false);
