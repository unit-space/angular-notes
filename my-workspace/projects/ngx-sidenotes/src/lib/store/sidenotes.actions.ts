import {createAction, props} from '@ngrx/store';

export enum SIDENOTES_ACTIONS {
  CONNECTION_SIDENOTE = '[sidenotes] CONNECTION_SIDENOTE',
  DISCONNECT_SIDENOTE = '[sidenotes] DISCONNECT_SIDENOTE',
  CONNECT_ANCHOR = '[sidenotes] CONNECT_ANCHOR',
  DISCONNECT_ANCHOR = '[sidenotes] DISCONNECT_ANCHOR',
  SELECT_ANCHOR = '[sidenotes] SELECT_ANCHOR',
  SELECT_SIDENOTE = '[sidenotes] SELECT_SIDENOTE',
  REPOSITION_SIDENOTES = '[sidenotes] REPOSITION_SIDENOTES',
  RESET_ALL_SIDENOTES = '[sidenotes] RESET_ALL_SIDENOTES',
  DESELECT_SIDENOTE = '[sidenotes] DESELECT_SIDENOTE',
  CONNECT_ANCHOR_BASE = '[sidenotes] CONNECT_ANCHOR_BASE',
}

export interface ConnectSidenoteAction {
  docId: string;
  sidenoteId: string;
  baseId?: string;
}

export interface ConnectAnchorAction extends ConnectSidenoteAction {
  // docId: string;
  // sidenoteId?: string;
  anchorId: string;
  element?: string | HTMLElement;
}

export const connectSidenote = createAction(
  SIDENOTES_ACTIONS.CONNECTION_SIDENOTE, props<ConnectSidenoteAction>()
);

export const connectAnchor = createAction(
  SIDENOTES_ACTIONS.CONNECT_ANCHOR, props<ConnectAnchorAction>()
);

export const connectAnchorBase = createAction(
  SIDENOTES_ACTIONS.CONNECT_ANCHOR_BASE, props<ConnectAnchorAction>()
);

export const selectSidenote = createAction(
  SIDENOTES_ACTIONS.SELECT_SIDENOTE, props<ConnectSidenoteAction>()
);

export const selectAnchor = createAction(
  SIDENOTES_ACTIONS.SELECT_ANCHOR, props<ConnectAnchorAction>()
);

export const disconnectSidenote = createAction(
  SIDENOTES_ACTIONS.DISCONNECT_SIDENOTE, props<ConnectSidenoteAction>()
);

export const disconnectAnchor = createAction(
  SIDENOTES_ACTIONS.DISCONNECT_ANCHOR, props<ConnectAnchorAction>()
);

export const resetAllSidenotes = createAction(
  SIDENOTES_ACTIONS.RESET_ALL_SIDENOTES
);

export const deselectSidenote = createAction(
  SIDENOTES_ACTIONS.DESELECT_SIDENOTE, props<{ docId: string }>()
);

export const repositionSidenotes = createAction(
  SIDENOTES_ACTIONS.REPOSITION_SIDENOTES, props<{ docId: string }>()
);

