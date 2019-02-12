<template>
  <div class="container">
    <nav id="sidebar">
      <ul class="list-unstyled components">
        <li class="active nav-custom" style="margin-top: 40px;cursor:pointer ">
          <div class="text-center" v-if="!diasableFlag" @click="dashboard()">
            <i class="fas fa-home" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Dashboard</p>
          </div>
          <div class="text-center" v-if="diasableFlag">
            <i class="fas fa-home" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Dashboard</p>
          </div>
        </li>
        <hr>
        <!-- <li class="nav-custom" style="cursor:pointer">
          <div class="text-center" @click="reference()">
            <i class="fas fa-swatchbook" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Reference</p>
          </div>
        </li>
        <hr>-->
        <li class="nav-custom" style="cursor:pointer">
          <div class="text-center" v-if="!diasableFlag" @click="parts_analysis()">
            <i class="fas fa-list-ul" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Analysis</p>
          </div>
          <div class="text-center" v-if="diasableFlag" >
            <i class="fas fa-list-ul" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Analysis</p>
          </div>
        </li>
        <hr>
        <li class="nav-custom" style="cursor:pointer">
          <div class="text-center" @click="createPartsRequest()">
            <i class="fas fa-plus" style="fontSize:20px"></i>
            <br>
            <p class="upload-text">Create Analysis Request</p>
          </div>
        </li>
        <hr>
      </ul>
    </nav>
  </div>
</template>

<script>

import router from "../../router";
export default {
  name: "SideNav",
  props: ["menu","diasableFlag"],
  data() {
    console.log("props", this.$props);
    return {
      partsClose: true,
      showPartsChild: false
    };
  },
  beforeMount() {
    if (this.$props.menu === "analysis") {
      this.showPartsChild = true;
    }
  },
  methods: {
    Parts() {
      this.partsClose = !this.partsClose;
      this.showPartsChild = !this.showPartsChild;
    },
    dashboard() {
      router.push("/dashboard");
    },
    parts_analysis() {
      router.push("/parts/analysis/dashboard");
    },
    createPartsRequest() {
      router.push("/parts/analysis/create");
    },
    reference() {
      router.push("/reference");
    }
  }
};
</script>
<style>
.container {
  width: 70px;
  height: 100%;
}
.commonpart .flex-container {
  display: flex;
  flex-direction: column;
}
.body {
  background: #f8fafd;
  overflow: hidden;
}
.wrapper {
  display: flex;
  width: 100%;
}

#sidebar {
  width: 70px;
  position: fixed;
  top: 50px;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #293f55;
  color: #fff;
  transition: all 0.3s;
}

a {
  text-decoration: none;
  color: white;
}
.content {
  margin: 0 0 0 100px;
}

a:hover {
  text-decoration: none;
}

hr {
  width: 80%;
  border-color: #ffffff;
}

#content {
  background-color: #f8fafd;
  overflow: hidden !important;
  width: 100%;
  margin-top: 100px;
}

.nav-custom {
  padding-top: 20px rem !important;
}

.upload-text {
  font-size: 0.75vw;
  font-family: Arial;
}

.overlay {
    background-color:#EFEFEF;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0px;
    left: 0px;
    opacity: .5; /* in FireFox */ 
    filter: alpha(opacity=50); /* in IE */
}
</style>
