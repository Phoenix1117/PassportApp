<template>
  <div>
   
    <div class="custom-container" style="paddingTop: 3%">
      <div class="row-one">
        <div class="myBreadCrumb">
          <p>
            <span style="font-size: 14px;">{{current}}</span>
          </p>
        </div>

        <toggle-button
          style="margin-left:95% "
          :value="state"
          :color="{checked: 'green', unchecked: 'green'}"
          :sync="true"
          :labels="{checked: 'ReOrder', unchecked: 'Total'}"
          :width="80"
          v-tooltip.top.hover.focus="'Click to Toggle'"
          @change="stateChange()"
        />
        <div class="row text-center">
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Total Customer</span>
                <br>
                <span class="text-middle">{{dashboardData.total_customer}}</span>
              </div>
              <div class="vertical"></div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Critical PONs</span>
                <br>
                <span class="text-middle" style="color:red">{{dashboardData.critical_pon}}</span>
              </div>
              <div class="vertical"></div>
            </div>
            <!-- <span class="text-bottom">+76.00 Mar-Apr</span> -->
          </div>
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Critical Customers</span>
                <br>
                <span class="text-middle" style="color:red">{{dashboardData.critical_customer}}</span>
              </div>
              <div class="vertical"></div>
            </div>
            <!-- <span class="text-bottom">+76.00 Mar-Apr</span> -->
          </div>
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Critical Depots</span>
                <br>
                <span class="text-middle" style="color:red">{{dashboardData.critical_depot}}</span>
              </div>
              <div class="vertical"></div>
            </div>
            <!-- <span class="text-bottom">+76.00 Mar-Apr</span> -->
          </div>
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Total PON types</span>
                <br>
                <span class="text-middle">{{dashboardData.total_pon_type}}</span>
              </div>
              <div class="vertical"></div>
            </div>
            <!-- <span class="text-bottom">+76.00 Mar-Apr</span> -->
          </div>
          <div class="col-lg-2">
            <div class="row">
              <div class="col-lg-10">
                <span class="text-top">Total Depots</span>
                <br>
                <span class="text-middle">{{dashboardData.total_depot}}</span>
              </div>
            </div>
            <!-- <span class="text-bottom">+76.00 Mar-Apr</span> -->
          </div>
        </div>
      </div>

      <div class="row-two">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-lg-11">
                    <h5>Top PONs</h5>
                  </div>
                  <i @click="routeTable()" class="fas fa-share-square" style="cursor:pointer"></i>
                </div>
              </div>
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">PONs</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in topPons" :key="item.id">
                      <td>{{item.part_name}}</td>
                      <td>{{item.critical_pon_count}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-lg-11">
                    <h5>Top Depots</h5>
                  </div>
                  <i @click="routeTable()" class="fas fa-share-square" style="cursor:pointer"></i>
                </div>
              </div>
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Depot</th>
                      <th scope="col">PONs Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in topDepots" :key="item.id">
                      <td>{{item.depot_name}}</td>
                      <td>{{item.critical_pon_count}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-lg-11">
                    <h5>Top Customers</h5>
                  </div>
                  <i @click="routeTable()" class="fas fa-share-square" style="cursor:pointer"></i>
                </div>
              </div>
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Customer</th>
                      <th scope="col">PONs Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in topCustomer" :key="item.id">
                      <td>{{item.customer_name}}</td>
                      <td>{{item.critical_pon_count}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row-two">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div id="container" style="height:250px"></div>
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div id="container2" style="height:250px"></div>
              </div>
            </div>
          </div>-->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <GmapMap :center="gmap.center" :zoom="3" style="width: 100%; height: 36vh">
                  <GmapCluster :icon="icon" :zoomOnClick="true">
                    <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      @click="routeTable()"
                      :label="{fontSize:'8px',text:m.label}"
                      :title="m.title"
                    ></gmap-marker>
                  </GmapCluster>
                </GmapMap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router/";
import SideNav from "@/components/sidenav/sidenav";
import headernav from "@/components/header/header";
import piechart from "../../utilies/piechart.json";
import linechart from "../../utilies/linechart.json";
import * as data from "../../utilies/dumpdata.json";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";
import * as constant from "../constant/constant";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import VTooltip from "v-tooltip";

Vue.use(VTooltip);

Vue.component("GmapCluster", GmapCluster);
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAk2MMMJwyvyiAYzxIGzjIEmjWVB0Z6Vv0"
  }
});

export default {
  name: "Dashboard",
  components: {
    SideNav,
    headernav
  },
  mounted() {
    // this.chartone();
    // this.charttwo();
    // $(document).ready(function() {
    //   $("#example").DataTable();
    // });
  },
  created() {
    clearInterval(window.intervalObj);
    this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
      console.log("coordinates ----->", coordinates);
    });
    this.getMainDashboardCount();
    this.getTopPons();
    this.getTopDepots();
    this.getTopCustomer();
    this.getPieChart();
    this.getMapLocations(this.markers);
  },
  data() {
    console.log("dashboard", this.data);
    return {
      gmap: {
        center: { lat: 48.1667, lng: -100.1667 }
      },
      data: data,
      dashboardData: [],
      topPons: [],
      topDepots: [],
      topCustomer: [],
      toggle: "reorder",
      state: true,
      markers: [],
      icon: {
        url: require("../../assets/mapicon.png") // url
      },
      current: "Dashboard"
    };
  },
  methods: {
    // chartone() {
    //   let pie = piechart;
    //   // pie.series[0].data[0].y =
    //   console.log("pie chart ------->", pie.series[0].data[0].y);
    //   Highcharts.chart("container", piechart);
    // },
    // charttwo() {
    //   Highcharts.chart("container2", linechart);
    // },
    routeTable() {
      router.push("/table");
    },

    // This Method is to get data for Main Dash Borad Details

    getMainDashboardCount() {
      fetch(
        constant.APIURL +
          "api/v1/get_main_dashboard_count?toggle=" +
          this.toggle,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_dashboard_request_count-->", data);
            this.dashboardData = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },

    // This Method is to get data for TOP PONS table

    getTopPons() {
      fetch(constant.APIURL + "api/v1/get_top_pons?toggle=" + this.toggle, {
        method: "GET"
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- PONS Data-->", data);
            this.topPons = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },

    // This Method is to get data for TOP DEPOTS table

    getTopDepots() {
      fetch(constant.APIURL + "api/v1/get_top_depots?toggle=" + this.toggle, {
        method: "GET"
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_dashboard_request_count-->", data);
            this.topDepots = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },

    // This Method is to get data for TOP CUSTOMER table

    getTopCustomer() {
      fetch(
        constant.APIURL + "api/v1/get_top_customers?toggle=" + this.toggle,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_dashboard_request_count-->", data);
            this.topCustomer = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    getPieChart() {
      fetch(constant.APIURL + "api/v1/get_pie_chart?toggle=" + this.toggle, {
        method: "GET"
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- getPieChart-->", data);
            piechart.series[0].data[0].y = data.critical_pon;
            piechart.series[0].data[1].y = data.non_critical_pon;
            Highcharts.chart("container", piechart);
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    getMapLocations(markers) {
      fetch(constant.APIURL + "api/v1/get_lat_lon?toggle=" + this.toggle, {
        method: "GET"
      }).then(response => {
        response.text().then(text => {
          const data = text && JSON.parse(text);
          let promise = new Promise(function(resolve, reject) {
            var i;

            for (i = 0; i < data.length; i++) {
              var mapData = {
                position: {
                  lat: parseInt(data[i].lat),
                  lng: parseInt(data[i].long)
                },
                label: String(data[i].critical_pon_count),
                title: String(data[i].depot_name)
              };
              console.log("Map datas =>", mapData);
              markers.push(mapData);
            }
            return mapData;
          });
          promise.then(
            mapData => alert("hi this is ", mapData), // shows "done!" after 1 second
            error => alert(error) // doesn't run
          );

          console.log("final data", this.markers);
        });
      });
    },
    mapFunction() {
      map.setZoom(9);
    },

    stateChange() {
      this.state = !this.state;
      if (this.state) {
        console.log(this.toggle);
        this.toggle = "reorder";
        this.getMainDashboardCount();
        this.getPieChart();
        this.getTopDepots();
        this.getTopCustomer();
        this.getTopPons();
        this.markers = [];
        this.getMapLocations(this.markers);
      } else {
        this.toggle = "total_stock";
        this.getMainDashboardCount();
        this.getPieChart();
        this.getTopDepots();
        this.getTopCustomer();
        this.getTopPons();
        this.markers = [];
        this.getMapLocations(this.markers);
      }
    }
  }
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
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  max-height: 42vh;
  min-height: 42vh;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  overflow: auto;
}
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(237, 237, 237);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.myBreadCrumb {
  margin-top: -2%;
  margin-bottom: 2%;
}
.vue-tooltip {
  background-color: white;
  color: #71869e;
}
</style>


