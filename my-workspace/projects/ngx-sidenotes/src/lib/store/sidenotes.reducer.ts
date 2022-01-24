import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as sidenotesActions from './sidenotes.actions';

export interface Sidenote {
  id: string;
  baseAnchors: string[];
  inlineAnchors: string[];
  top: number;
  visible?: boolean;
}

export interface DocState {
  id: string;
  selectedAnchor: string | null;
  selectedSidenote: string | null;
  anchors: {
    [anchorId: string]: {
      id: string;
      sidenote: string;
      element: string;
    };
  };
  sidenotes: {
    [sidenoteId: string]: Sidenote;
  };
}

export interface SidenotesState {
  ui: {
    docs: {
      [docId: string]: DocState;
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
  on(sidenotesActions.connectSidenote, (state, payload: sidenotesActions.ConnectSidenoteAction) => {
    const baseIds = payload.baseId ? [payload.baseId] : [];
    const prevSidenote = state.ui.docs[payload.docId].sidenotes[payload.sidenoteId];
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            sidenotes: {
              ...state.ui.docs[payload.docId].sidenotes,
              [payload.sidenoteId]: {
                ...prevSidenote,
                id: payload.sidenoteId,
                baseAnchors: [...baseIds, ...(prevSidenote?.baseAnchors ?? [])],
                inlineAnchors: [...(prevSidenote?.inlineAnchors ?? [])],
              }
            },
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.CONNECTION_SIDENOTE);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.connectAnchorBase, (state, payload: sidenotesActions.ConnectAnchorBaseAction) => {
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            anchors: {
              ...state.ui.docs[payload.docId].anchors,
              [payload.anchorId]: {
                id: payload.anchorId,
                sidenote: 'ANCHOR_BASE',
                element: payload.element,
              }
            },
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.CONNECT_ANCHOR_BASE);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.connectAnchor, (state, payload: sidenotesActions.ConnectAnchorAction) => {
    const prevSidenote = state.ui.docs[payload.docId]?.sidenotes[payload.sidenoteId];
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            sidenotes: {
              ...state.ui.docs[payload.docId]?.sidenotes,
              [payload.sidenoteId]: {
                ...prevSidenote,
                inlineAnchors: [payload.anchorId, ...(prevSidenote?.inlineAnchors ?? [])],
              },
            },
            anchors: {
              ...state.ui.docs[payload.docId]?.anchors,
              [payload.anchorId]: {
                id: payload.anchorId,
                sidenote: payload.sidenoteId,
                element: payload.element,
              },
            },
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.CONNECT_ANCHOR);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.selectAnchor, (state, payload: sidenotesActions.SelectAnchorAction) => {
    const anchor = state.ui.docs[payload.docId].anchors[payload.anchorId];
    if (!anchor) return state;
    const sidenote = state.ui.docs[payload.docId].sidenotes[anchor.sidenote];
    const anchors = [
      payload.anchorId,
      ...[...(sidenote?.inlineAnchors ?? [])].filter((a) => a !== payload.anchorId),
    ];
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            sidenotes: {
              ...state.ui.docs[payload.docId].sidenotes,
              [anchor.sidenote]: {
                ...sidenote,
                inlineAnchors: anchors,
              },
            },
            selectedAnchor: payload.anchorId,
            selectedSidenote: anchor.sidenote,
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.SELECT_ANCHOR);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.disconnectAnchor, (state, payload: sidenotesActions.DisconnectAnchorAction) => {
    const anchor = state.ui.docs[payload.docId].anchors[payload.anchorId];
    if (!anchor) return state;
    const anchors = {...state.ui.docs[payload.docId].anchors};
    delete anchors[payload.anchorId];
    const sidenote = state.ui.docs[payload.docId].sidenotes[anchor.sidenote];
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            sidenotes: {
              ...state.ui.docs[payload.docId].sidenotes,
              [anchor.sidenote]: {
                ...sidenote,
                inlineAnchors: [...(sidenote?.inlineAnchors ?? [])].filter((a) => a !== payload.anchorId),
              },
            },
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.DISCONNECT_ANCHOR);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.selectSidenote, (state, payload: sidenotesActions.SelectSidenote) => {
    const prevSidenote = state.ui.docs[payload.docId]?.sidenotes[payload.sidenoteId];
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            selectedSidenote: payload.sidenoteId,
            selectedAnchor: prevSidenote?.inlineAnchors?.[0] ?? prevSidenote?.baseAnchors?.[0] ?? null,
            sidenotes: {
              ...state.ui.docs[payload.docId].sidenotes,
              [payload.sidenoteId]: {
                ...prevSidenote,
                id: payload.sidenoteId,
                baseAnchors: [...(prevSidenote?.baseAnchors ?? [])],
                inlineAnchors: [...(prevSidenote?.inlineAnchors ?? [])],
              },
            }
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.SELECT_SIDENOTE);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
  on(sidenotesActions.deselectSidenote, (state, payload: {docId: string}) => {
    const tempState = {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            selectedAnchor: null,
            selectedSidenote: null,
          }
        }
      }
    };
    const nextDoc = placeSidenotes(tempState.ui.docs[payload.docId], sidenotesActions.SIDENOTES_ACTIONS.SELECT_SIDENOTE);
    return {
      ...state,
      ui: {
        ...state.ui,
        docs: {
          ...state.ui.docs,
          [payload.docId]: {
            ...state.ui.docs[payload.docId],
            ...nextDoc,
          }
        }
      }
    };
  }),
);

function getHeight(id: string) {
  return document.getElementById(id)?.offsetHeight ?? 0;
}

function getAnchorElement(state: DocState, sidenote: Sidenote): HTMLElement | null {
  // Iterate through all of the inline, and then work towards base anchors
  // This should return fast, usually the first element is defined!
  // If an ID is removed from the DOM, this falls back to any other anchors
  const allAnchors = [...(sidenote.inlineAnchors ?? []), ...(sidenote.baseAnchors ?? [])];
  for (let index = 0; index < allAnchors.length; index += 1) {
    const anchor = state.anchors[allAnchors[index]];
    const element = document.getElementById(anchor?.id ?? '');
    if (element) return element;
  }
  return null;
}

function getTopLeft(anchor: HTMLElement | null) {
  // Recurse up the tree until you find the article (nested relative offsets)
  let el: HTMLElement | null = anchor;
  let top = 0;
  let left = 0;
  do {
    top += el?.offsetTop || 0;
    left += el?.offsetLeft || 0;
    el = (el?.offsetParent ?? null) as HTMLElement | null;
  } while (el && el.tagName !== 'ARTICLE');
  return { top, left };
}

function placeSidenotes(state: DocState, actionType: string): DocState {
  // Do not place comments if it is a deselect call
  if (actionType === sidenotesActions.SIDENOTES_ACTIONS.DESELECT_SIDENOTE) return state;
  type Loc = [string, { top: number; left: number; height: number }];
  let findMe: Loc | undefined;
  const sorted = Object.entries(state.sidenotes)
    .map(([id, sidenote]) => {
      const element = getAnchorElement(state, sidenote);
      const loc: Loc = [id, { ...getTopLeft(element), height: getHeight(id) }];
      if (id === state.selectedSidenote) {
        findMe = loc;
      }
      return loc;
    })
    .sort((a, b) => {
      if (a[1].top === b[1].top) return a[1].left - b[1].left;
      return a[1].top - b[1].top;
    });

  const idx = findMe ? sorted.indexOf(findMe) : 0;
  // Push upwards from target (or nothing)
  const before = sorted.slice(0, idx + 1).reduceRight((prev, [id, loc]) => {
    const { top } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.min(top - loc.height - 10, loc.top) || loc.top; // opts.padding === 10
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  // Push comments downward
  const after = sorted.slice(idx).reduce((prev, [id, loc]) => {
    const { top, height } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.max(top + height + 10, loc.top) || loc.top; // opts.padding === 10
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  const idealPlacement = Object.fromEntries([...before, ...after]);

  let hasChanges = false;
  const sidenotes = Object.fromEntries(
    Object.entries(state.sidenotes).map(([id, comment]) => {
      const { top } = idealPlacement[id];
      if (comment.top !== top) {
        hasChanges = true;
        return [id, { ...comment, top }];
      }
      return [id, comment];
    }),
  );
  if (!hasChanges) return state;
  return {
    ...state,
    sidenotes,
  };
}

export function sidenotesReducer<T, V extends Action = Action>(state: SidenotesState, action: Action) {
  return _sidenotesReducer(state, action);
}

export const sidenotesStateFeature = createFeatureSelector<SidenotesState>('sidenotes');

export const selectedSidenote = createSelector(sidenotesStateFeature,
  (state: SidenotesState, props: {docId?: string | null}) => {
    if (props.docId == null) return null;
    return state.ui.docs[props.docId]?.selectedSidenote;
  });
export const isSidenoteSelected = createSelector(sidenotesStateFeature,
  (state: SidenotesState, props: {docId?: string | null, sidenoteId?: string | null}) => {
    if (props.docId == null || props.sidenoteId == null) {
      return false;
    }
    return state.ui.docs[props.docId]?.selectedSidenote === props.sidenoteId;
  });
export const sidenoteTop = createSelector(sidenotesStateFeature,
  (state: SidenotesState, props: {docId?: string | null, sidenoteId?: string | null}) => {
    if (props.docId == null || props.sidenoteId == null) return 0;
    return state.ui.docs[props.docId]?.sidenotes[props.sidenoteId]?.top ?? 0;
  });

