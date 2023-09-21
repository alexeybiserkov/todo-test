const getItemHTML = (item, count) => {
    return `
        <li draggable="true" class="todo-item js--item ${item.completed ? 'is--complete' : ''}" key="${count}" elementId="${item.id}">
            <span class="todo-item-move-icon"></span>
            <label>
                <input class="js--checkbox todo-item-status" type="checkbox" ${item.completed ? "checked" : ''}>
                <span class="todo-item-status-icon"></span>
            </label>
            <span class="todo-item-label">
                <input class="js--title" type="text" value="${item.title}"></span>
            </label>
            <button class="js--delete todo-item-delete-icon"></button> 
        </li>
    `;
};

const getItemListHTML = (collection) => {
    return `<ul class="todo-list">
        ${collection.map( (item, c) => {
            return getItemHTML(item, c);
        }).join('')}
    </ul>`; 
}

const getCounterHTML = (collection) => {
    const completedItems = collection.filter( item => item.completed );
    return `${completedItems.length}/${collection.length} done`
}

const render = (el, html) => {
    el.innerHTML = html;
}

export default getItemListHTML;

export {
    getItemHTML, getItemListHTML, getCounterHTML, render
}