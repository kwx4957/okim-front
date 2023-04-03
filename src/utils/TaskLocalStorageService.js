class TaskLocalStorageService{

    constructor() {
        this.adhocTaskId = localStorage.getItem('adhocTaskId') || '';
    }

    getAdhocTadkId() {
        return this.adhocTaskId;
    }

    setAdhocTaskId(adhocTaskId){
        this.adhocTaskId = adhocTaskId;
        localStorage.setItem('adhocTaskId', adhocTaskId)
        return this.adhocTaskId;
    }
}

export default TaskLocalStorageService