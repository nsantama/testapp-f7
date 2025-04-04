import { defineStore } from "pinia";
import { useListCollectionStore } from "./ListCollection.js";
import { database } from "@/firebaseConfig";
import { ref, onValue, set, get, push } from "firebase/database";

export const useListStore = defineStore("toDoList", {
	state: () => ({
		toDoList: [],
    activeListName: "no list selected",
    activeListId: null,
	}),
	actions: {
		async fetchListData() {
      // Filtrar para eliminar los elementos eliminados
      if (!this.activeListId) return; // No active list selected
      const databaseRef = ref(database, `/${this.activeListId}/tasks`);
      console.log("Fetching list data from Firebase...");
      if (!databaseRef) return; // No database reference available
      const listData = await get(databaseRef);
      if (!listData.exists()) {
        console.log("No data available for this list.");
        this.toDoList = []; // Reset toDoList if no data is found
        return;
      }
      console.log("List collection data:", listData.val());
      this.toDoList = Object.entries(listData.val()).map(([key, value]) => ({
        id: key,
        ...value,
      }));
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
        name: taskName,
        description: "none",
        completed: false,
        tags: ['test'],
        deadline: Date.now(),
        creation: Date.now(),
        deleted: false,
      };
      // this.toDoList.push(newTask);
      const databaseRef = ref(database, `/${this.activeListId}/tasks`);
      const newTaskRef = push(databaseRef);
      set(newTaskRef, newTask);
      this.fetchListData();
    },
    removeTask(taskId) {
      const taskIndex = this.toDoList.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.toDoList[taskIndex].deleted = true; // Mark as deleted instead of removing
        const databaseRef = ref(database, `/${this.activeListId}/tasks/${taskId}`);
        set(databaseRef, this.toDoList[taskIndex]);
      }
    },
    updateTaskCompletion(taskId, completed) {
      const taskIndex = this.toDoList.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.toDoList[taskIndex].completed = completed;
        const databaseRef = ref(database, `/${this.activeListId}/tasks/${taskId}`);
        set(databaseRef, this.toDoList[taskIndex]);
      }
    }
	}
});
