<template>
 <div>
   <headernav msg="Reference"/>
   <side-nav menu="refernce"/>
   <div class="custom-container" style="padding:3%; paddingTop:7%">
     <div class="myBreadCrumb" style="margin-bottom:1px">
       <p>
         <span style="font-size: 14px;">Reference</span>
       </p>
     </div>
     <div class="shadow-lg p-3 mb-5 bg-white rounded">
       <h5>Reference File Information</h5>
       <div class="form-group">

         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> Part File :</label>
           </div>
           <div class="col-lg-4">
             <div class="row">
                 <div class="col-lg-1" >
                   <label for="fileupload" class="file">
                     <input type="file" @change="partsFileEvent" id="fileupload" style="display:none">
                     <i style="cursor:pointer" class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{partsFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-3" style="cursor:pointer">
            <download-excel :data="partsAnalysisRequestList" type="csv" name="Sample_Parts.csv">
              <div class="float-left" style="marginTop:1%">
                <i class="fa fa-download" aria-hidden="true"></i> 
              </div>
              <div style="paddingLeft:7%;paddingTop:1%" >
                <span>Download Sample_Parts.csv</span>
                </div>
            </download-excel>  
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="uploadPartsData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadPartsData()">Save</button>
           </div>
         </div>

         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> Depot File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>


         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> End Customer File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>


         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> High Spare File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>


         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> Misnomer PON Conversion File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>

         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> MTBF Spare requirement File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>

         <div class="row" style="marginTop:2%">
           <div class="col-lg-3">
               <label style="font-size:19px"> Site Node File :</label>
           </div>
           <div class="col-lg-3">
             <div class="row">
                 <div class="col-lg-1">
                   <label for="fileupload" class="file">
                     <input type="file" @change="analysisFile" id="fileupload" style="display:none">
                     <i class="fas fa-paperclip fa-2x"></i>
                   </label>
                 </div>
                 <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-4">
             <div class="row">
               <div class="float-left" style="marginTop:1%">
                  <download-excel :data="partsAnalysisRequestList" type="csv">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </download-excel>
                </div>
                <div style="paddingLeft:7%;paddingTop:1%" class="col-lg-4">
                   <span>{{analysisFileName}}</span>
                 </div>
               </div>
           </div>
           <div class="col-lg-2">
             <button  v-if="referenceId !== ''" type="button" class="btn btn-success" @click="updateReferenceData()">Update</button>
             <button  v-else type="button" class="btn btn-success" @click="uploadReferenceData()">Save</button>
           </div>
         </div>

       </div>
     </div>
     
   </div>
 </div>
</template>

<script>
import router from "../../router";
import SideNav from "@/components/sidenav/sidenav";
import headernav from "@/components/header/header";
import * as constant from "../constant/constant";
//import * as partsData from "../../utilies/sampleparts.json";
import * as partsData from "../../utilies/dumpdata.json";

export default {
  name: "Reference",
  components: {
    SideNav,
    headernav
  },
  created() {
    this.getreference();
  },
  data() {
    console.log("home");
    return {
      partsFile: "",
      partsFileName: "no file chosen",
      email_id:"khali.saran@ekryp.com",
      partsAnalysisRequestList:partsData
    };
  },
  methods: {
    partsFileEvent(e) {
      console.log("hi");
      console.log("image ----sap->", e.target.files);
      const file = e.target.files[0];
      if (
        file.name.endsWith("csv") ||
        file.name.endsWith("CSV")
      ) {
        console.log(file.name);
        this.partsFile = file;
        this.partsFileName=file.name;
      } else {
        alert("error");
      }
    },
    getreference() {
      console.log(this.email_id);
      fetch(
        constant.APIURL +
          "api/v1/getreference?user_email_id=" +
          this.email_id ,
        {
          method: "GET"
        }
      ).then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data -- Reference Data-->", data);
            this.referenceDetails = data;
            
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    }


    ,

    uploadPartsData() {
      console.log(localStorage.getItem('email_id'));
      //let email_id = localStorage.getItem("email_id");
      this.email_id = "khali.saran@ekryp.com";
       let data = {
         analysisfile: this.analysisfile,
         email_id:this.email_id
       };
       
         if (this.partsfile !== "") {
             this.post_reference_data(data);
           }
           else {
           alert("Please add your Parts File");
         }
         
       
     },
     uncheckOthers(id){
      //  let tmp=[1,3,4]
      //  console.log("The id is ",id);
      //  for(var i=0;i<this.referenceDetails.length;i++)
      //  {
      //    if(tmp[i]!=id)
      //    {
      //      console.log("The yttp is ",tmp[i]);
      //      //document.getElementById(String(tmp[i])).checked = false;
      //      $("#"+String(tmp[i])).prop("checked", false);
      //    }
        
      //    console.log("The  id is ",id);
      //  }
      //  //document.getElementById("checkbox").checked = false;
      for(var i=0;i<this.referenceDetails.length;i++)
       {
         if(this.referenceDetails[i].id===id)
         {
           this.referenceName=this.referenceDetails[i].name;
           this.referenceId=this.referenceDetails[i].id;
         }
         console.log("refer name",this.referenceName);
         console.log("refer ID",this.referenceId);
        }
     },
     updatePartsData()
     {
       console.log(localStorage.getItem('email_id'));
      //let email_id = localStorage.getItem("email_id");
      this.email_id = "khali.saran@ekryp.com";
       let data = {
         partsFile: this.partsFile,
         email_id:this.email_id,
         //reference_id:this.referenceId

       };
         if (this.analysisfile !== "") {
             this.post_reference_data(data);
           }
           else {
           alert("Please add your Reference File");
         }
         }
         ,
     post_reference_data(data)
     {

      let formData = new FormData();
      formData.append("parts_file", data.partsFile);
      formData.append("user_email_id", data.email_id);
      if(this.referenceId !== "")
      {
        formData.append("reference_id",this.referenceId);
      }
      
      console.dir("formdata ----->asd", formData.get("parts_file"));
      fetch("http://10.138.1.3:5000/api/v1/post_parts", {
        method: "POST",
        body: formData
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("Response from backend data ---->", data);
            this.getreference();
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
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
