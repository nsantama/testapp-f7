<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app v-bind="f7params">
    <f7-panel left cover>
      <LeftPanel />
    </f7-panel>

    <!-- Main view-->
    <f7-view main>
      <f7-navbar>
        <f7-nav-left>
          <f7-link panel-open="left">
            <!-- No funciona los iconos -->
            <f7-icon material="home"/> 
          </f7-link>
        </f7-nav-left>
        <f7-nav-title>To do list</f7-nav-title>
      </f7-navbar>
      <MainList />
    </f7-view>

    <!-- Popup. All modals should be outside of Views -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <!-- Link to close popup -->
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Here comes popup text</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>
  </f7-app>
</template>

<script setup>
  import LeftPanel from './components/LeftPanel.vue';
  import MainList from './components/MainList.vue';
</script>

<script>
  import {
    f7, 
    f7ready, 
    f7App, 
    f7View, 
    f7Page, 
    f7Navbar, 
    f7Block, 
    f7Popup, 
    f7NavRight, 
    f7NavLeft,
    f7NavTitle,
    f7Link, 
    f7Panel, 
    f7Button,
    f7Icon
  } from 'framework7-vue';
  export default {
    name: 'App',
    components: {
      f7,
      f7ready,
      f7App,
      f7View,
      f7Page,
      f7Navbar,
      f7Block,
      f7Popup,
      f7NavRight,
      f7NavLeft,
      f7NavTitle,
      f7Link,
      f7Panel,
      f7Button,
      f7Icon,
      LeftPanel,
      MainList
    },
    mounted() {
      // Framework7 initialization
      f7ready(() => {
        console.log('Framework7 is ready');
      });
    },
    setup() {
      const f7params = ref({
        name: 'My App',
        theme: 'auto',
        routes: [
          // Define your app routes here
        ]
      });
      return {
        f7params
      };
    }
  };
</script>
<style lang="css">
@import 'framework7/css/bundle';
</style>