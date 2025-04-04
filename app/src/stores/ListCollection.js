import { defineStore } from "pinia";

export const useListCollectionStore = defineStore("listCollection", {
  state: () => ({
    listCollection: [],
  }),
  actions: {
    fetchListCollectionData() {
      console.log("Fetching list collection data...");
      this.listCollection = [
        { id: '1', name: "List 1" },
        { id: '2', name: "List 2" },
        { id: '3', name: "List 3" },
      ];
    },
    createList(listName) {
      const newList = {
        id: (this.listCollection.length + 1).toString(),
        name: listName,
      };
      this.listCollection.push(newList);
    }
  },
});
