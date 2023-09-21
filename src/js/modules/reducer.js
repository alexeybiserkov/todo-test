const ActionTypes = {
    SET_ITEMS: "SET_ITEMS",
    ADD_ITEM: "ADD_ITEM",
    UPDATE_ITEM: "UPDATE_ITEM",
    UPDATE_INDEX: "UPDATE_INDEX",
    DELETE_ITEM: "DELETE_ITEM",
};

function generateUniqueId() {
  const randomPart = Math.random().toString(36).substr(2, 10);
  const timestampPart = new Date().getTime().toString(36);
  const uniqueId = randomPart + timestampPart;
  return uniqueId;
}

export default function reducer(state, action) {
    
    switch (action.type) {

      case ActionTypes.SET_ITEMS: // Set Initial
        return [
          ...action.payload
        ];

      case ActionTypes.UPDATE_ITEM: // Update Item
        return state.map(existingItem => {
          if (existingItem.id == action.payload.item.id) {
            return {
              ...existingItem,
              ...action.payload.item
            };
          } else {
            return existingItem;
          }
        });

      case ActionTypes.UPDATE_INDEX: // Update Position
        const currentIndex = state.findIndex(item => item.id == action.payload.id);
      
        if (currentIndex === -1) {
          return state;
        }
      
        const itemToMove = state[currentIndex];
        const newState = [...state];
      
        newState.splice(currentIndex, 1)
        newState.splice(action.payload.index, 0, itemToMove)
  
        return newState;

      case ActionTypes.ADD_ITEM: // Add Item
        return [
          ...state,
          {
            completed: false,
            id: generateUniqueId(),
            title: "New Todo Item",
            userId: generateUniqueId(),
          }
        ];

      case ActionTypes.DELETE_ITEM: // Delete Item
        const itemIdToDelete = action.payload.id;
        const newStateAfterDelete = state.filter(item => item.id != itemIdToDelete);
        return newStateAfterDelete;

      default:
        return state;
    }
  }

  export {
    ActionTypes, reducer
  }
  