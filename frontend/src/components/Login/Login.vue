<template>
    <div>
    </div>
</template>

<script>
import AuthService from "./AuthService";
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted() {
    console.log("login data");
    AuthService.login(this);
  }
};
</script>
