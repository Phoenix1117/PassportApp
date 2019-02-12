<template>
  <div>
    <headernav msg="Dashboard"/>
    <side-nav/>
    <div class="custom-container" style="paddingTop: 5%">
      <div class="row">
        <div class="col-lg-12">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <div class="float-right">
              <toggle-button
                :value="state"
                :color="{checked: 'green', unchecked: 'green'}"
                :sync="true"
                :labels="{checked: 'ReOrder', unchecked: 'Total'}"
                :width="80"
                v-tooltip.top.hover.focus="'Click to Toggle'"
                @change="stateChange()"
              />
            </div>
            <div class="float-left">
              <button type="button" class="btn btn-success">
                <download-excel :data="top_extended" type="csv" v-tooltip.top.hover.focus="'Click to Download'">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br>
            <br>
            <table id="example" class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">PON</th>
                  <th scope="col">Depot</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in top_extended" :key="item.id">
                  <td>{{item.customer_name}}</td>
                  <td>{{item.part_name}}</td>
                  <td>{{item.depot_name}}</td>
                  <td>{{item.critical_pon_count}}</td>
                </tr>
              </tbody>
            </table>
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
import Multiselect from "vue-multiselect";
import * as constant from "../constant/constant";
//import * as data from "../../utilies/tabledata.json";

export default {
  name: "DynamicTable",
  components: {
    SideNav,
    headernav
  },
  created() {
    clearInterval(window.intervalObj);
    this.getTopExtenededData();
  },
  data() {
    console.log("dashboard", this.data);
    return {
      data: [],
      top_extended: [],
      topTable: "true",
      midTable: "false",
      lastTable: "false",
      customer: null,
      parts: null,
      depots: null,
      partName: "",
      customerName: "",
      toggle: "reorder",
      state: true
    };
  },
  methods: {
    stateChange() {
      this.state = !this.state;
      if (this.state) {
        this.toggle = "reorder";
        this.getTopExtenededData();
      } else {
        this.toggle = "total_stock";
        this.getTopExtenededData();
      }
    },
    renderMidTable(data) {
      console.log("data" + data);
      console.log("custnamae" + this.customerName);
      if (data === null) {
        data = this.customerName;
        this.midTable = "true";
        this.lastTable = "false";
      } else {
        this.customerName = data;
        this.midTable = "true";
        this.topTable = "false";
        this.lastTable = "false";
      }
      console.log("data" + data);

      var i;
      let x = this.data.parts;
      let tmp = [];

      for (i = 0; i < x.length; i++) {
        //console.log(x[i].part_name)
        if (x[i].customer_name === data) {
          var parttmpobj = {
            part_name: x[i].part_name,
            count: x[i].count
          };
          tmp.push(parttmpobj);
          // console.log(tmp)
        }
      }
      console.dir(tmp);
      this.parts = tmp;
    },
    renderLastTable(data) {
      //console.log(data)
      this.partName = data;
      this.topTable = "false";
      this.midTable = "false";
      this.lastTable = "true";
      var i;
      let x = this.data.depots;
      let tmp = [];
      for (i = 0; i < x.length; i++) {
        if (x[i].part_name === data) {
          var depottmpobj = {
            depot_name: x[i].depot_name,
            count: x[i].count
          };
          tmp.push(depottmpobj);
        }
      }
      //console.dir(tmp);
      this.depots = tmp;
    },
    renderCustomerTable() {
      this.topTable = "true";
      this.midTable = "false";
      this.lastTable = "false";
    },
    getTopExtenededData() {
      fetch(constant.APIURL + "api/v1/get_top_extended?toggle=" + this.toggle, {
        method: "GET"
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_top_extended-->", data);
            this.top_extended = data;
            $(document).ready(function() {
              $("#example").DataTable();
            });
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    createCustomerData() {
      var i;
      let x = this.data;
      console.log("hi");
      let tmp = [];
      for (i = 0; i < x.length; i++) {
        if (x[i].part_name === data) {
          var depottmpobj = {
            depot_name: x[i].depot_name,
            count: x[i].count
          };
          tmp.push(depottmpobj);
        }
      }
      //console.dir(tmp);
      this.depots = tmp;
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

/* For cursor Pointer Change to Hand Icon */

.in-progress {
  cursor: pointer;
}
.vue-tooltip {
    background-color: white;
    color:#71869e;
    
}
</style>

