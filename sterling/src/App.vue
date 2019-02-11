<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
  color: #72879d;
  background-color: #f7f7f7;
  font-size: 1vw;
}
.custom-container {
  margin-left: 5%;
  padding: 2%;
}
.btn-success {
  background-color: #26b99a;
}
.btn-success:hover {
  background-color: #169f85;
}
.breadcrumb {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  font-size: 1.15vw;
  font-weight: 500;
  cursor: pointer;
}
/* .container {
  width: 100% !important;
  height: 100%;
} */
</style>
