<template>
  <div>
    <headernav msg="Spare Details"/>
    <side-nav menu="analysis"/>

    <div class="custom-container" style="padding:3%; paddingTop:7.57%; marginLeft:3%">
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
            id="nav-netInventory-tab"
            data-toggle="tab"
            href="#nav-netInventory"
            role="tab"
            aria-controls="nav-netInventory"
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
          <div class="shadow p-3 mb-5 bg-white rounded" id="ErrorDiv">
          
            <div class="float-right" style="paddingBottom:1%"></div>

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
import * as data from "./data.json";
import Vue from "vue";
import * as constant from "../constant/constant";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "ErrorSummary",
  components: {
    SideNav,
    headernav,
    AgGridVue
  },
  created() {
    this.requestId = this.$route.query.id;
    this.createErrorColumnDefs();
    this.get_error_records(this.$route.query.id);

  },
  data() {
    console.log("SpareDetails");
    return {
      requestID: "",
      data: data,
      state: true,
      toggle: "reorder",
      currentInventory: [],
      partsAnalysisSummaryReslut: [],
      dispId: "",
      analysisName: [],
      currentGross: [],
      errorData: [],
      currentib: [],
      postMenu: "Analysis >",
      current: "Error Summary",
      errorColumnDefs: null,
      errorRowData: [],
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
    redirectToAnalysis() {
      router.push("/parts/analysis/dashboard");
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
</style>
