<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.halo-tree-searching {

}
.halo-tree-search-box {
  height: 18px;
  line-height: 18px;
  outline: none;
  border: 1px solid #888888;
  border-radius: 3px;
}
.halo-tree-search-box:focus {
  border: 1px solid rgb(16, 142, 233);
  -webkit-box-shadow: 0 2px 2px rgba(16, 142, 233, .2);
  box-shadow: 0 2px 2px rgba(16, 142, 233,.2);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
</style>
