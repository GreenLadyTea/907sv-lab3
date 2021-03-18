export enum ACTION_TYPES {
  ADD = 'add',
  REMOVE = 'remove',
  CHECK = 'check',
  FILTER = 'filter'
}

export interface IActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface IActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface IActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface IActionFilter {
  type: typeof ACTION_TYPES.FILTER;
}

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type IAction = IActionAdd | IActionRemove | IActionCheck | IActionFilter;

export type State = { list: Item[]; isFiltered: boolean; searchBar: string };

export const initialState: State = {
  list: [],
  isFiltered: false,
  searchBar: ''
};

export const reducer = function (action: IAction, state = initialState): State {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return { ...state, list: [...state.list.filter(Item => Item.id !== action.payload)] };
    }
    case ACTION_TYPES.ADD: {
      const newTask = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return { ...state, list: [...state.list, newTask] };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list[i].isChecked = !state.list[i].isChecked;
        }
      }
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.FILTER: {
      return { ...state, isFiltered: !state.isFiltered };
    }
    default:
      return { ...state };
  }
};

export function selectFilteredList(state: State): Item[] {
  if (state.isFiltered) {
    return state.list.filter(element => element.isChecked);
  }
  return state.list;
}
