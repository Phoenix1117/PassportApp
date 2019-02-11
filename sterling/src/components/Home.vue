<template>
  <div class="main">
    <div class="content">
      <h1>Welcome to EKRYP</h1>
      <button type="button" class="btn btn-primary" @click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import router from "../router/";

export default {
  name: "Home",
  created() {
    console.log(JSON.stringify(localStorage));
    let userId = localStorage.getItem("auth0_user_id");
    console.log("userId---->", userId);
    if (userId !== null && userId !== undefined) {
      router.push("/dashboard");
    }
  },
  data() {
    console.log("home");
    return {};
  },
  methods: {
    login() {
      router.push("/login");
    }
  }
};
</script>
<style>
.main {
  height: 100vh;
  background-color: #293f55;
}
.content {
  padding-top: 20%;
  text-align: center;
  vertical-align: middle;
}
</style>
