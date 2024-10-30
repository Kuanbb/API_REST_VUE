<script>
  import UserList from  './components/ProductList.vue';
  export default {
    name: 'App',
    components: {
      UserList,
    },
  };
</script>

<template>
  <div id="app">
    <h1>Cadastro de Produtos</h1>
    <UserList />
  </div>
</template>

<style>
</style>