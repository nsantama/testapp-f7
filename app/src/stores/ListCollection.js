import { defineStore } from "pinia";
import { database } from "@/firebaseConfig";
import { ref, onValue, set, get, push } from "firebase/database";

export const useListCollectionStore = defineStore("listCollection", {
  state: () => ({
    listCollection: [],
  }),
  actions: {
    async fetchListCollectionData() {
      console.log("Fetching list collection data...");
      const databaseRef = ref(database, "/");
      const listCollectionData = await get(databaseRef);
      console.log("List collection data:", listCollectionData.val());
      this.listCollection = Object.entries(listCollectionData.val()).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
    async createListCollection(listName) {
      const newList = {
        name: listName,
        description: '',
        tasks: [],
      };
      const databaseRef = ref(database, "/");
      const newListRef = push(databaseRef);
      set(newListRef, newList);
      this.fetchListCollectionData();
    }
  },
});
