<template>
  <div>
    <h1>Client Home</h1>
    <div class="custom-container" style="background-image: url('../../../assets/bg-1.jpg')">
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <div class="col-lg-11">
                <h5>Applied Forms</h5>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Applicant Name</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="item in topPons" :key="item.id">
                    <td>{{item.part_name}}</td>
                    <td>{{item.critical_pon_count}}</td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <h5>Pending Forms</h5>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Applicant Name</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="item in topPons" :key="item.id">
                    <td>{{item.part_name}}</td>
                    <td>{{item.critical_pon_count}}</td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../../router/";

export default {
  name: "Home",
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.text-top {
  font-size: 1.15vw;
  font-weight: 500;
}
.text-middle {
  font-size: 40px;
  font-weight: 600;
}
.text-bottom {
  font-size: 1vw;
}
.row-one {
  padding-top: 5%;
}
.row-two {
  margin-top: 2%;
}
.vertical {
  width: 1%;
  height: 60px;
  background-color: #adb2b5;
}
.container {
  width: 100% !important;
  height: 100%;
}

/* For cursor Pointer Change to Hand Icon */

.in-progress {
  cursor: pointer;
}
.vue-tooltip {
  background-color: white;
  color: #71869e;
}
</style>

