<template>
	<f7-page>
		<!-- Page content -->
    <f7-block-title large>{{ listStore.activeListName }}</f7-block-title>
    <f7-list strong inset>
      <f7-list-item v-for="item in filteredTasks" :key="item.id">
        <f7-checkbox name="test" :checked="item.completed" @change="(e) => onTaskCompletition(e, item.id)"/>
        <f7-title>{{ item.name }}</f7-title>
        <f7-button fill round small color="red" @click="deleteTask(item.id)">delete</f7-button>
      </f7-list-item>
    </f7-list>

    <f7-block-title large>Create New Task</f7-block-title>
		<f7-block strong inset>
      <f7-input
        type="text"
        placeholder="New Element Name"
        clear-button
        @input="newTaskName = $event.target.value"
      ></f7-input>
      <f7-button 
        fill
        round
        small
        color="green"
        @click="createNewTask"
      >Add new element</f7-button>
    </f7-block>
		<!-- Buttons to open panels -->
		
	</f7-page>
</template>
<script>
import { f7 } from 'framework7-vue';
import { useListStore } from '@/stores/ToDoList';
export default {
	name: 'MainList',
	methods: {
    loadData() {
      // Call the store action to load lists
      this.listStore.fetchListData()
    },
    createNewTask() {
      if (!this.newTaskName) {
        f7.dialog.alert('Please enter a task name.', 'Error');
        return;
      }
      this.listStore.createNewTask(this.newTaskName);
      this.newTaskName = '';
    },
    onTaskCompletition(e, taskId) {
      // Call the store action to update task completion status
      this.listStore.updateTaskCompletion(taskId, e.target.checked);
    },
    deleteTask(taskId) {
      // Call the store action to delete task
      f7.dialog.confirm(
        'Are you sure you want to delete this task?',
        'Delete Task',
        () => {
          f7.dialog.alert('Task deleted successfully!', 'Success');
          this.listStore.removeTask(taskId);
        },
        () => {
          f7.dialog.close();
        }
      );
    },
	},
	data() {
		return {};
	},
  computed: {
    filteredTasks() {
      return this.listStore.toDoList.filter(task => !task.deleted);
    },
  },
  setup() {
    const listStore = useListStore();
    let newTaskName = '';
    return {
      listStore,
      newTaskName,
    };
  },
};
</script>