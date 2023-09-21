async function loadFakeDataFromAPI () {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json(); 
        return data;
    } catch (error) {
        throw error; 
    }
};

const appStore = {
    isInit: () => localStorage.getItem('app_initialized') ? true : false,
    setInit: () => localStorage.setItem('app_initialized', true),
    getItems: () => JSON.parse(localStorage.getItem("todo_items")),
    setItems: (collection) => localStorage.setItem('todo_items', JSON.stringify(collection)),
    loadItems: async function() {
        const data = await loadFakeDataFromAPI();
        
        if (data) {
            this.setItems(data);
            this.setInit();
        }

    }
}

export default appStore;