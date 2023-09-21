import useState from "./modules/state";
import {
    ActionTypes,
    reducer
} from "./modules/reducer";
import {
    getItemListHTML,
    getCounterHTML,
    render
} from "./modules/view";
import appStore from "./modules/localData";

document.addEventListener('DOMContentLoaded', async () => {

    // Init app and data
    if (!appStore.isInit()) {
        await appStore.loadItems();
    };

    // State 
    const [state, dispatch, subscribe] = useState(null, reducer);

    // DOM Elements to insert html
    const todoApp = document.getElementById('todoApp');
    const listElement = document.getElementById('todoList');
    const counterElement = document.getElementById('todoCounter');

    // Subscribe for state update
    subscribe(() => {
        // Render List
        render(listElement, getItemListHTML(state()));
    })

    subscribe(() => {
        // Render Counter
        render(counterElement, getCounterHTML(state()));
    })

    subscribe(() => {
        // Save New Data to Local Store
        appStore.setItems(state());
    })

    // Event Listeners

    // Inputs Listeners
    todoApp.addEventListener('change', (e) => {
        const el = e.target;

        // Change Complete Status Handler
        if (el.classList.contains('js--checkbox')) {  
            const isCheked = el.checked;
            const parentElement = el.closest('.js--item');
            const elementId = parentElement.getAttribute('elementId');

            dispatch({
                type: ActionTypes.UPDATE_ITEM,
                payload: {
                    item: {
                        id: elementId,
                        completed: isCheked
                    }
                }
            });
        }

        // Change Title Handler
        if (el.classList.contains('js--title')) {  
            const value = el.value;
            const parentElement = el.closest('.js--item');
            const elementId = parentElement.getAttribute('elementId');

            dispatch({
                type: ActionTypes.UPDATE_ITEM,
                payload: {
                    item: {
                        id: elementId,
                        title: value
                    }
                }
            });
        }
    });

    // Buttons Listeners
    todoApp.addEventListener('click', (e) => {
        const el = e.target;

        // Add button
        if (el.classList.contains('js--add')) { 
            dispatch({
                type: ActionTypes.ADD_ITEM
            });
        }

        // Remove button
        if (el.classList.contains('js--delete')) { 
            const parentElement = el.closest('.js--item');
            const elementId = parentElement.getAttribute('elementId');

            dispatch({
                type: ActionTypes.DELETE_ITEM,
                payload: {
                    id: elementId
                }
            });
        }
        
    });

    // Dragging Listener
    let dragOverIndex = null;
    
    listElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dragOverIndex = Array.from(listElement.querySelectorAll('li')).indexOf(e.target);
    });

    listElement.addEventListener("dragend", (e) => {
        e.preventDefault();

        dispatch({
            type: ActionTypes.UPDATE_INDEX,
            payload: {
                id: e.target.getAttribute('elementId'),
                index: dragOverIndex
            }
        });
    });

    //Set initial state data
    dispatch({
        type: ActionTypes.SET_ITEMS,
        payload: appStore.getItems()
    });
})