import { defineStore } from "pinia";
import { useListCollectionStore } from "./ListCollection.js";

export const useListStore = defineStore("toDoList", {
	state: () => ({
		toDoList: [],
    activeListName: "no list selected",
    activeListId: null,
	}),
	actions: {
		fetchListData() {
      // Filtrar para eliminar los elementos eliminados
			this.toDoList = [
				{ id: '1', name: "List 1", description: "none", completed: false, tags: ['test'], deadline: Date.now(), creation: Date.now(), deleted: false },
        { id: '2', name: "List 2", description: "none", completed: true, tags: ['test'], deadline: Date.now(), creation: Date.now(), deleted: false },
        { id: '3', name: "List 3", description: "none", completed: false, tags: ['test'], deadline: Date.now(), creation: Date.now(), deleted: false },
			];
		},
    updateActiveList(listId) {
      this.activeListId = listId;
      const listCollectionStore = useListCollectionStore();
      const list = listCollectionStore.listCollection.find(list => list.id === listId);
      if (list) {
        this.activeListName = list.name;
      } else {
        this.activeListName = "default";
      }
      this.fetchListData();
    },
    createNewTask(taskName) {
      const newTask = {
        id: (this.toDoList.length + 1).toString(),
        name: taskName,
        description: "none",
        completed: false,
        tags: ['test'],
        deadline: Date.now(),
        creation: Date.now(),
        deleted: false,
      };
      this.toDoList.push(newTask);
    },
    removeTask(taskId) {
      const taskIndex = this.toDoList.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.toDoList[taskIndex].deleted = true; // Mark as deleted instead of removing
      }
    },
    updateTaskCompletition(taskId, completed) {
      const taskIndex = this.toDoList.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.toDoList[taskIndex].completed = completed;
      }
    }
	}
});
