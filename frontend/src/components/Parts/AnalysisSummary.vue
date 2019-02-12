<template>
  <div class="shadow p-3 mb-5 bg-white rounded" id="SummaryDiv">
    <br>
    <div class="row" v-if="partsAnalysisSummaryReslut.length !== 0">
      <div class="col-lg-4">
        <div class="form-group">
          <strong>Analysis Name</strong>
          <input
            type="email"
            v-model="analysisName[0].analysis_name"
            class="form-control"
            placeholder="Analysis Name"
            disabled
            style="fontSize:1vw; marginTop:2%"
          >
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group">
          <strong>Customer Name</strong>
          <input
            type="email"
            class="form-control"
            v-model="partsAnalysisSummaryReslut[0].customer_name"
            placeholder="Customer Name"
            disabled
            style="fontSize:1vw;marginTop:2%"
          >
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group">
          <strong>Analysis ID</strong>
          <input
            type="email"
            class="form-control"
            v-model="dispId"
            placeholder="Analysis Id"
            disabled
            style="text-align:right; fontSize:1vw; marginTop:2%"
          >
        </div>
      </div>
    </div>

    <div class="float-right" style="paddingBottom:1%">
      <toggle-button
        :value="state"
        :color="{checked: 'green', unchecked: 'green'}"
        :sync="true"
        cssColors:true
        :labels="{checked: 'ReOrder', unchecked: 'Total'}"
        :width="80"
        v-tooltip.top.hover.focus="'Click to Toggle'"
        @change="stateChange()"
      />
      <button type="button" class="btn btn-success" v-tooltip.top.hover.focus="'Click to Download'">
        <download-excel :data="partsAnalysisSummaryReslut" type="csv">
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
              :columnDefs="summaryColumnDefs"
              :rowData="summaryRowData"
              :gridOptions="summaryGridOptions"
              :enableColResize="true"
              :enableSorting="true"
              :enableFilter="true"
              :groupHeaders="true"
              rowSelection="multiple"
              pagination="true"
              :paginationPageSize="10"
              :gridReady="OnReady"
              :gridSizeChanged="OnReady"

            ></ag-grid-vue> 
  </div>
</template>

<script>
import router from "../../router/";
import SideNav from "@/components/sidenav/sidenav";
import headernav from "@/components/header/header";
import { mapActions, mapState } from "vuex";
import Vue2Filters from "vue2-filters";
import Vue from "vue";
import * as constant from "../constant/constant";
import { AgGridVue } from "ag-grid-vue";
import Tooltip from "vue-directive-tooltip";
import "vue-directive-tooltip/css/index.css";
Vue.use(Tooltip);

Vue.use(Vue2Filters);
export default {
  name: "PartsAnalysisSummary",
  props: ["analysisId"],
  components: {
    SideNav,
    headernav,
    AgGridVue
  },
  created() {
    console.log("props ----->", this.$props);
    this.requestId = this.$props.analysisId;
    this.dispId = `AR0000` + this.requestId;
    this.createAnalysisSummaryColumnDefs();
    this.get_request_analysis_summary_result(this.requestId);
    this.get_analysis_name(this.requestId);

  },
  computed: {},
  data() {
    console.log("AnalysisSummary", this.$store.state);
    return {
      requestId: "",
      partsAnalysisSummaryReslut: [],
      dispId: "",
      analysisName: [],
      toggle: "reorder",
      state: true,
      columnDefs: null,
      rowData: null,
      summaryColumnDefs: null,
      summaryRowData: [],
      summaryGridOptions:{
        rowStyle: {
          color: "#72879d"
          // fontSize: "13.7px",
        }
      }
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",", ".");
    },
    stateChange() {
      this.state = !this.state;
      if (this.state) {
        console.log(this.toggle);
        this.toggle = "reorder";
        this.get_request_analysis_summary_result(this.requestId);
      } else {
        this.toggle = "total_stock";
        this.get_request_analysis_summary_result(this.requestId);
      }
    },
    get_analysis_name(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_analysis_name?request_id=" +
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
            console.log("data -- get_analysis_name-->", data);
            this.analysisName = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_request_analysis_summary_result(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_summary_specific_request?request_id=" +
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
            console.log("data -- get_dashboard_request_count-->", data);
            this.partsAnalysisSummaryReslut = data;
            for (let i = 0; i < this.partsAnalysisSummaryReslut.length; i++) 
            {
              this.summaryRowData.push({
                  part_name: this.partsAnalysisSummaryReslut[i].part_name,
                  depot_name: this.partsAnalysisSummaryReslut[i].depot_name,
                  material_number: this.partsAnalysisSummaryReslut[i].material_number,
                  ib_quantity: this.partsAnalysisSummaryReslut[i].ib_quantity,
                  standard_cost: this.partsAnalysisSummaryReslut[i].standard_cost,
                  gross_qty: this.partsAnalysisSummaryReslut[i].gross_qty,
                  std_gross_cost: this.partsAnalysisSummaryReslut[i].std_gross_cost,
                  net_qty: this.partsAnalysisSummaryReslut[i].net_qty,
                  net_std_cost: this.partsAnalysisSummaryReslut[i].net_std_cost,
                  ext_spare_cost: this.partsAnalysisSummaryReslut[i].ext_spare_cost,
                  spare_count: this.partsAnalysisSummaryReslut[i].spare_count,
                  spare_count: this.partsAnalysisSummaryReslut[i].spare_count,
                  high_spare: this.partsAnalysisSummaryReslut[i].high_spare
                  });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    createAnalysisSummaryColumnDefs()
    {
      this.summaryColumnDefs = [
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
          headerName: "Material",
          field: "material_number",
          width: 150
        },
        {
          headerName: "Install Base Quantity",
          field: "ib_quantity",
          width: 150
        },
        {
          headerName: "Standard Cost($)",
          field: "standard_cost",
          width: 150
        },
        {
          headerName: 'Gross Requirement',
          children: [
            {
              headerName: "Quantity",
              field: "gross_qty",
              width: 125,
            },
            {
                headerName: "Ext Standard Cost($)",
                field: "std_gross_cost",
                width: 120,
            },
          ]
        },{
          headerName: 'Net Requirement',
          children: [
            {
              headerName: "Quantity",
              field: "net_qty",
              width: 125,
            },
            {
                headerName: "Standard Cost($)",
                field: "net_std_cost",
                width: 120,
            },
          ]
        },{
          headerName: 'High Spare Requirement',
          children: [
            {
              headerName: "Quantity",
              field: "high_spare",
              width: 125,
            },
            {
                headerName: "Ext Standard Cost($)",
                field: "ext_spare_cost",
                width: 120,
            },
          ]
        },
        {
          headerName: "Has High Spare?",
          field: "high_spare",
          width: 250,
          cellRenderer: actionCellRenderer
        }
        ];
      },
      OnReady(event) {
       var gridWidth = document.getElementById('SummaryDiv').offsetWidth;

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
function actionCellRenderer(params) {
  let high_spare=params.value;
  let skills = [];
  console.log(params);
  if(high_spare === "1")
  {
    skills.push('<input type="checkbox" name="hishspare" checked></i>');
  }else
  {
    skills.push('<input type="checkbox" name="hishspare"></i>');
  }
  return skills.join(" ");
}
</script>
<style>
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #f5f5f5 !important;
  opacity: 1;
}
.vue-tooltip {
  background-color: white;
  color: #71869e;
}
</style>
