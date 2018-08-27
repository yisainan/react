const INPUT_CHANGED = 'react-redux-ducks/toDoApp/INPUT_CHANGED';
const INPUT_SUBMIT = 'react-redux-ducks/toDoApp/INPUT_SUBMIT';
const LIST_ITEM_CLICK = 'react-redux-ducks/toDoApp/LIST_ITEM_CLICK';
const DELETE_LIST_ITEM = 'react-redux-ducks/toDoApp/DELETE_LIST_ITEM';

export function listItemClick(index){
  return {
    type: LIST_ITEM_CLICK,
    index
  }
}

export function deleteListItem(index) {
  return {
    type: DELETE_LIST_ITEM,
    index
  }
}

export function inputSubmit(){
  return {
    type: INPUT_SUBMIT
  };
}

export function inputChange(value){
  return {
    type: INPUT_CHANGED,
    value
  }
}

const initialState = {
  list: [{item: 'test', done: false}],
  newToDo: ''
};

export default function reducer(state = initialState, action){
  switch (action.type){
  case INPUT_SUBMIT:
    return Object.assign(
      {},
      state,
      {
        list: [...state.list, {item: state.newToDo, done: false }],
        newToDo: ''
      }
    );
  case INPUT_CHANGED:
    return Object.assign(
      {},
      state,
      {newToDo: action.value}
    );
  case LIST_ITEM_CLICK:
    return Object.assign(
      {},
      state,
      {
        list: [
          ...state.list.slice(0, action.index),
          Object.assign({}, state.list[action.index], {done: !state.list[action.index].done}),
          ...state.list.slice(action.index+1)
        ]
      }
    );
  case DELETE_LIST_ITEM:
    return Object.assign(
      {},
      state,
      {
        list: [
          ...state.list.slice(0, action.index),
          ...state.list.slice(action.index+1)
        ]
      }
    );
  default:
    return state;
  }
}