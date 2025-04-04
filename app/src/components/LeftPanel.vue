<template>
	<f7-view>
		<f7-page>
			<f7-navbar title="Left Panel"></f7-navbar>
      <f7-block>
        <f7-button 
          fill
          round
          small
          color="blue"
          @click="LoadLists"
          >Load Lists</f7-button>
      </f7-block>
			<f7-block>
				<p>Here's a display of the lists, click one to load</p>
        <f7-list dividers>
          <f7-list-item
            v-for="item in listCollectionStore.listCollection"
            :key="item.id"
            :title="item.name"
            link
            @click="listStore.updateActiveList(item.id)"
          />
        </f7-list>
      </f7-block>
      <f7-block>
        <f7-input
          type="text"
          placeholder="New List Name"
          clear-button
          @input="newListName = $event.target.value"
        ></f7-input>
				<f7-button 
					fill
					round
					small
					color="green"
          @click="CreateNewList"
					>Create new list</f7-button>
          <!-- Open pop up para crear nueva categoria -->
			</f7-block>
		</f7-page>
	</f7-view>
</template>

<script>
import { f7 } from 'framework7-vue';
import { useListCollectionStore } from '@/stores/ListCollection';
import { useListStore } from '@/stores/ToDoList';

export default {
	name: 'LeftPanel',
	methods: {
    LoadLists() {
      // Call the store action to load lists
      this.listCollectionStore.fetchListCollectionData()
    },
    CreateNewList() {
      if (!this.newListName) {
        f7.dialog.alert('Please enter a list name.', 'Error');
        return;
      }
      this.listCollectionStore.createList(this.newListName);
    },
	},
	data() {
		return {};
	},
	setup() {
    const listCollectionStore = useListCollectionStore();
    const listStore = useListStore();
    let newListName = '';
    return {
      listCollectionStore,
      listStore,
      newListName,
    };
	},
};
</script>