<template>
  <div>
    <headernav msg="Spare Details"/>
    <side-nav menu="analysis"/>

    <div class="custom-container" style="padding:3%; paddingTop:7.57%;marginLeft:4%">
      <div>
        <div class="myBreadCrumb" style="margin-bottom:1px">
          <p>
            <span class="in-progress" @click="redirectToAnalysis()">{{postMenu}}</span>
            <span style="font-size: 14px;">{{current}}</span>
          </p>
        </div>
      </div>
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-item nav-link active"
            id="nav-summary-tab"
            data-toggle="tab"
            href="#nav-summary"
            role="tab"
            aria-controls="nav-summary"
            aria-selected="true"
          >Summary Result</a>
          <a
            class="nav-item nav-link"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >Current Inventory</a>
          <a
            class="nav-item nav-link"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >Install Base Quantity</a>
          <a
            class="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            href="#nav-contact"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >Gross</a>
          <a
            class="nav-item nav-link"
            id="nav-netInventory-tab"
            data-toggle="tab"
            href="#nav-netInventory"
            role="tab"
            aria-controls="nav-netInventory"
            aria-selected="false"
          >Net</a>
          <a
            class="nav-item nav-link"
            id="nav-error-tab"
            data-toggle="tab"
            href="#nav-error"
            role="tab"
            aria-controls="nav-error"
            aria-selected="false"
          >Error</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-summary"
          role="tabpanel"
          aria-labelledby="nav-summary-tab"
        >
          <br>
          <AnalysisSummary :analysisId="requestID"/>
        </div>
        <!-- current Inventory -->
        <div
          class="tab-pane fade show"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <br>
          <div class="shadow p-3 mb-5 bg-white rounded" id="CurrDiv">
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
              <button type="button" class="btn btn-success" v-tooltip.top.hover.focus="'Click to Download'">
                <download-excel :data="currentInventory" type="csv">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br>
            <br>
           <ag-grid-vue
              style="width: 100%; height: 345px;"
              class="ag-theme-balham"
              :columnDefs="currColumnDefs"
              :rowData="currRowData"
              :gridOptions="gridOptions3"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="currOnReady"
              :gridSizeChanged="currOnReady"

            ></ag-grid-vue> 
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <br>
          <div class="shadow p-3 mb-5 bg-white rounded" id="IbDiv">
            <div class="float-right">
              <button type="button" class="btn btn-success" v-tooltip.top.hover.focus="'Click to Download'">
                <download-excel :data="currentib" type="csv">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br>
            <br>
            <!-- <table id="currentIBQuantity" class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Product Ordering Name</th>
                  <th scope="col">Node Depot Belongs</th>
                  <th scope="col">PON Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="x in currentib" :key="x.id">
                  <td>{{x.product_ordering_name}}</td>
                  <td>{{x.node_depot_belongs}}</td>
                  <td>{{x.pon_quanity}}</td>
                </tr>
              </tbody>
            </table> -->
            <ag-grid-vue
              style="width: 100%; height: 345px;"
              class="ag-theme-balham"
              :columnDefs="ibColumnDefs"
              :rowData="ibRowData"
              :gridOptions="gridOptions2"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="ibOnReady"
              :gridSizeChanged="ibOnReady"
            ></ag-grid-vue> 
              
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <br>
          <div class="shadow p-3 mb-5 bg-white rounded" id="GrossDiv">
            <div class="float-right">
              <button type="button" class="btn btn-success">
                <download-excel :data="currentGross" type="csv" v-tooltip.top.hover.focus="'Click to Download'">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br>
            <br>
           
            <ag-grid-vue
              style="width: 100%; height: 345px;"
              class="ag-theme-balham"
              :columnDefs="grossColumnDefs"
              :rowData="grossRowData"
              :gridOptions="gridOptions"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="grossOnReady"
              :gridSizeChanged="grossOnReady"

            ></ag-grid-vue>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-netInventory"
          role="tabpanel"
          aria-labelledby="nav-netInventory-tab"
        >
          <br>
          <div class="shadow p-3 mb-5 bg-white rounded" id="NetDiv">
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
              <button type="button" class="btn btn-success" v-tooltip.top.hover.focus="'Click to Download'">
                <download-excel :data="currentNet" type="csv">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br>
            <br>
           <ag-grid-vue
              style="width: 100%; height: 345px;"
              class="ag-theme-balham"
              :columnDefs="netColumnDefs"
              :rowData="netRowData"
              :gridOptions="gridOptions1"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="netOnReady"
              :gridSizeChanged="netOnReady"

            ></ag-grid-vue> 
              
          </div>
        </div>
         <div
          class="tab-pane fade"
          id="nav-error"
          role="tabpanel"
          aria-labelledby="nav-error-tab"
        >
          <br>
          <div class="shadow p-3 mb-5 bg-white rounded" id="ErrorDiv">
            <!-- <div class="float-right">
              <toggle-button
                :value="state"
                :color="{checked: 'green', unchecked: 'green'}"
                :sync="true"
                :labels="{checked: 'ReOrder', unchecked: 'Total'}"
                :width="80"
                @change="stateChange()"
              />
              <button type="button" class="btn btn-success">
                <download-excel :data="currentNet" type="csv">
                  <i class="fas fa-file-excel"></i>
                  &nbsp;
                  Export
                </download-excel>
              </button>
            </div>
            <br>
            <br> -->
            <br>
            <ag-grid-vue
              style="width: 100%; height: 345px;"
              class="ag-theme-balham"
              :columnDefs="errorColumnDefs"
              :rowData="errorRowData"
              :gridOptions="ErrorGridOptions"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="errorOnReady"
              :gridSizeChanged="errorOnReady"

            ></ag-grid-vue> 
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
import AnalysisSummary from "@/components/Parts/AnalysisSummary";
import * as data from "./data.json";
import Vue from "vue";
import * as constant from "../constant/constant";
import { AgGridVue } from "ag-grid-vue";


export default {
  name: "SpareDetails",
  components: {
    SideNav,
    headernav,
    AnalysisSummary,
    AgGridVue
  },
  created() {
    this.requestID = this.$route.query.id;
    console.log("requestId ---->", this.requestId);
    this.createNetColumnDefs();
    this.createGrossColumnDefs();
    this.createIbColumnDefs();
    this.createCurrColumnDefs();
    this.createErrorColumnDefs();
    this.get_error_records(this.$route.query.id);
    this.get_current_inventory_specific_request(this.$route.query.id);
    this.get_gross_specific_request(this.$route.query.id);
    this.get_current_net_specific_request(this.$route.query.id);
    this.get_current_ib_specific_request(this.$route.query.id);
  },
  data() {
    console.log("SpareDetails");
    return {
      requestID: "",
      data: data,
      state: true,
      toggle: "reorder",
      currentInventory: [],
      currentGross: [],
      currentNet: [],
      currentib: [],
      errorData: [],
      grossColumnDefs: null,
      grossRowData: [],
      netColumnDefs: null,
      netRowData: [],
      ibColumnDefs: null,
      ibRowData: [],
      currColumnDefs: null,
      currRowData: [],
      errorColumnDefs: null,
      errorRowData: [],
      postMenu: "Analysis >",
      current: "Analysis Summary",
      gridOptions: {
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      },gridOptions1: {
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      },
      gridOptions2:{
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      },
      gridOptions3:{
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      },
      ErrorGridOptions:{
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      }
       
    };
  },
  mounted() {
    $(document).ready(function() {
      // $("#currentIBQuantity").DataTable();
      // $("#currentInventory").DataTable();
      // $("#netInventory").DataTable();
      // $("#currentCross").DataTable();
    });
  },
  methods: {
    stateChange() {
      this.state = !this.state;
      
      if (this.state) {
        this.toggle = "reorder";
        this.get_current_net_specific_request(this.$route.query.id);
        this.get_current_inventory_specific_request(this.$route.query.id);
        this.get_current_inventory_specific_request(this.$route.query.id);
      } else {
        this.toggle = "total_stock";
        this.get_current_net_specific_request(this.$route.query.id);
        this.get_current_inventory_specific_request(this.$route.query.id);
        this.get_current_inventory_specific_request(this.$route.query.id);
      }
    },
    get_current_inventory_specific_request(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_current_inventory_specific_request?request_id=" +
          requestId +
          "&toggle=" +
          this.toggle,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log(
              "data -- get_current_inventory_specific_request-->",
              data
            );
            this.currentInventory = data;
            for (let i = 0; i < this.currentInventory.length; i++) 
            {
              this.currRowData.push({
                  part_name: this.currentInventory[i].part_name,
                  depot_name: this.currentInventory[i].depot_name,
                  curr_quantity: this.currentInventory[i].qty
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_gross_specific_request(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_gross_specific_request?request_id=" +
          requestId,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_gross_specific_request-->", data);
            this.currentGross = data;
            for (let i = 0; i < this.currentGross.length; i++) 
            {
              this.grossRowData.push({
                  part_name: this.currentGross[i].part_name,
                  depot_name: this.currentGross[i].depot_name,
                  gross_quantity: this.currentGross[i].gross_qty
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_error_records(requestId) {
      fetch(
        constant.APIURL + "api/v1/get_error_records?request_id=" + requestId,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const payload = text && JSON.parse(text);
            console.log("Get Error data ---->", payload);
            this.errorData = payload;
             for (let i = 0; i < this.errorData.length; i++) 
            {
              this.errorRowData.push({
                  part_name: this.errorData[i].PON,
                  error_reason: this.errorData[i].error_reason,
                  node_name: this.errorData[i].node_name,
                  type: this.errorData[i].type
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_current_net_specific_request(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_current_net_specific_request?request_id=" +
          requestId +
          "&toggle=" +
          this.toggle,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_current_net_specific_request-->", data);
            this.currentNet = data;
             for (let i = 0; i < this.currentNet.length; i++) 
            {
              this.netRowData.push({
                  part_name: this.currentNet[i].part_name,
                  depot_name: this.currentNet[i].depot_name,
                  net_quantity: this.currentNet[i].net_qty,
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_current_ib_specific_request(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_current_ib_specific_request?request_id=" +
          requestId +
          "&toggle=" +
          this.toggle,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- get_current_ib_specific_request-->", data);
            this.currentib = data;
            for (let i = 0; i < this.currentib.length; i++) 
            {
              this.ibRowData.push({
                  node_depot_belongs: this.currentib[i].node_depot_belongs,
                  pon_quanity: this.currentib[i].pon_quanity,
                  product_ordering_name: this.currentib[i].product_ordering_name
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    redirectToAnalysis() {
      router.push("/parts/analysis/dashboard");
    },
    createGrossColumnDefs() {
      this.grossColumnDefs = [
        {
          headerName: "Part Name",
          field: "part_name",
          width: 250
        },
        {
          headerName: "Depot Name",
          field: "depot_name",
          width: 150
        },
        {
          headerName: "Gross Quantity",
          field: "gross_quantity",
          width: 150
        }
      ];
    },
    createNetColumnDefs() {
      this.netColumnDefs = [
        {
          headerName: "Part Name",
          field: "part_name",
          width: 250
        },
        {
          headerName: "Depot Name",
          field: "depot_name",
          width: 150
        },
        {
          headerName: "Net Quantity",
          field: "net_quantity",
          width: 150
        }
      ];
    },
    createIbColumnDefs() {
      this.ibColumnDefs = [
        {
          headerName: "Product Ordering Name",
          field: "node_depot_belongs",
          width: 250
        },
        {
          headerName: "Product Ordering Name",
          field: "product_ordering_name",
          width: 150
        },
        {
          headerName: "PON Quantity",
          field: "pon_quanity",
          width: 150
        }
      ];
    },
    createCurrColumnDefs()
    {
      this.currColumnDefs = [
        {
          headerName: "Part Name",
          field: "part_name",
          width: 250
        },
        {
          headerName: "Depot Name",
          field: "depot_name",
          width: 150
        },
        {
          headerName: "Reorder Point",
          field: "curr_quantity",
          width: 150
        }
      ];
    },
    createErrorColumnDefs()
    {
      this.errorColumnDefs = [
        {
          headerName: "Part Name",
          field: "part_name",
          width: 250
        },
        {
          headerName: "Error Reason",
          field: "error_reason",
          width: 150
        },
        {
          headerName: "Node Name",
          field: "node_name",
          width: 150
        },
        {
          headerName: "Type",
          field: "type",
          width: 150
        }
      ];
    },
    grossOnReady(event) {
       var gridWidth = document.getElementById('GrossDiv').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = event.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }

        // show/hide columns based on current grid width
        event.columnApi.setColumnsVisible(columnsToShow, true);
        event.columnApi.setColumnsVisible(columnsToHide, false);

        // fill out any available space to ensure there are no gaps
        event.api.sizeColumnsToFit();
      },
      netOnReady(event) {
       var gridWidth = document.getElementById('NetDiv').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = event.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }

        // show/hide columns based on current grid width
        event.columnApi.setColumnsVisible(columnsToShow, true);
        event.columnApi.setColumnsVisible(columnsToHide, false);

        // fill out any available space to ensure there are no gaps
        event.api.sizeColumnsToFit();
      },
      ibOnReady(event) {
       var gridWidth = document.getElementById('IbDiv').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = event.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }

        // show/hide columns based on current grid width
        event.columnApi.setColumnsVisible(columnsToShow, true);
        event.columnApi.setColumnsVisible(columnsToHide, false);

        // fill out any available space to ensure there are no gaps
        event.api.sizeColumnsToFit();
      },
      currOnReady(event) {
       var gridWidth = document.getElementById('CurrDiv').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = event.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }

        // show/hide columns based on current grid width
        event.columnApi.setColumnsVisible(columnsToShow, true);
        event.columnApi.setColumnsVisible(columnsToHide, false);

        // fill out any available space to ensure there are no gaps
        event.api.sizeColumnsToFit();
      },
      errorOnReady(event) {
       var gridWidth = document.getElementById('ErrorDiv').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = event.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }

        // show/hide columns based on current grid width
        event.columnApi.setColumnsVisible(columnsToShow, true);
        event.columnApi.setColumnsVisible(columnsToHide, false);

        // fill out any available space to ensure there are no gaps
        event.api.sizeColumnsToFit();
      }
  }
  
};
</script>
<style>
a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.nav-tabs .nav-link.active {
  color: #71879e;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  font-weight: 500;
  font-size: 1.15vw;
}
.nav-tabs .nav-link {
  color: black;
  font-size: 1.15vw;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.in-progress {
  cursor: pointer;
  font-size: 14px;
}
.myBreadCrumb {
  margin-top: -2%;
  margin-bottom: 2%;
}
.vue-tooltip {
    background-color: white;
    color:#71869e;

}
</style>
