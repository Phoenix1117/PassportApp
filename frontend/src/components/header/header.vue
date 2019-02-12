<template>
  <div style="position:fixed;marginLeft:0%;width:100%;z-index:99999;">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src="https://staging.ekryp.com/src/assets/ekryp.jpg" style="height:40px;width:100px">
      <div class="loader" id="loader-2" style="margin-left:35%;">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="color:#515356; fontWeight:500"
            >
              <i class="fas fa-user"></i>
              &nbsp;{{firstName}}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <!-- <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>-->
              <a class="dropdown-item" @click="logout()" style="cursor:pointer">
                <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../../router";
export default {
  name: "headernav",
  props: ["msg"],
  created() {
    this.firstName = localStorage.getItem("first_name");
    $(document).ready(function() {
      $("#loader-2").hide();
    });
  },
  data() {
    console.log("header");
    return {
      firstName: ""
    };
  },
  beforeMount() {},
  methods: {
    logout() {
      console.log("logout");
      router.push("/");
      localStorage.clear();
    }
  }
};
</script>
<style>
.dropdown-menu {
  font-size: 12px !important;
}
.bg-light {
  background-color: #ededed !important;
}
.text {
  font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
  color: #72879d !important;
  font-size: 25px;
}
a {
  text-decoration: none;
}

.main-wrap {
  background: #000;
  text-align: center;
}
.main-wrap h1 {
  color: #fff;
  margin-top: 50px;
  margin-bottom: 100px;
}
.col-md-3 {
  display: block;
  float: left;
  margin: 1% 0 1% 1.6%;
  background-color: #eee;
  padding: 50px 0;
}

.col:first-of-type {
  margin-left: 0;
}

/* ALL LOADERS */

.loader {
  width: 50;
  height: 50px;
  border-radius: 100%;
  position: center;
  margin: 0 auto;
}

/* LOADER 1 */

#loader-2 span {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: #26b89a;
  margin: 20px 10px;
}

#loader-2 span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}

#loader-2 span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}

#loader-2 span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}

@keyframes bounce {
  0%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25% {
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
</style>
