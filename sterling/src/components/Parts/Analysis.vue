<template>
  <div>
    <headernav msg="Spare Part Analysis"/>
    <side-nav menu="analysis"/>
    <div class="custom-container" style="paddingTop:3%">
      <!-- <div class="container"> -->
      <form style="marginTop: 5%;">
        <div>
          <div class="myBreadCrumb">
            <p>
              <span class="in-progress" @click="cancel()">{{postMenu}}</span>
              <span v-if="requestId!==''" style="font-size: 14px;">{{current}}</span>
              <span v-if="requestId===''" style="font-size: 14px;">Analysis Create</span>
            </p>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-3">
              <label>Analysis Name :</label>
            </div>
            <div class="col-lg-6">
              <input
                v-if="requestId !== '' && partsAnalysisData.analyisisName !== undefined"
                type="text"
                class="form-control"
                v-model="partsAnalysisData.analyisisName"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-3">
              <label>Customer Name :</label>
            </div>
            <div class="col-lg-6">
              <input
                v-if="requestId !== '' && partsAnalysisData.customerNames !== undefined"
                type="text"
                class="form-control"
                v-model="partsAnalysisData.customerNames"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-3">
              <label>Date :</label>
            </div>
            <div class="col-lg-6">
              <input
                v-if="requestId !== '' && partsAnalysisData.date !== undefined"
                type="text"
                class="form-control"
                placeholder="22 Nov 2018"
                v-model="partsAnalysisData.date"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-3">
              <label>Analysis Type :</label>
            </div>
            <div class="col-lg-6">
              <input
                v-if="requestId !== '' && partsAnalysisData.analysisType !== undefined"
                type="text"
                class="form-control"
                v-model="partsAnalysisData.analysisType"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-3">
              <label>Replenish time :</label>
            </div>
            <div class="col-lg-6">
              <input
                v-if="requestId !== '' && partsAnalysisData.replensihTime !== undefined"
                type="text"
                class="form-control"
                v-model="partsAnalysisData.replensihTime"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <!-- <strong>Files To Upload</strong> -->
          <div class="row" style="marginTop:0%">
            <div class="col-lg-3">
              <label>DNA File :</label>
            </div>
            <div class="col-lg-6 form-group">
              <div class="row">
                <div class="col-lg-1" v-if="requestId === ''">
                  <label for="fileupload" class="file">
                    <input type="file" @change="handleFile" id="fileupload" style="display:none">
                    <i class="fas fa-paperclip fa-2x"></i>
                  </label>
                </div>
                <div class="col-lg-8" v-if="requestId === ''">
                  <span v-if="dnafileName === ''">no file selected</span>
                  <span v-if="dnafileName !== ''">{{dnafileName}}</span>
                </div>
                <div class="col-lg-8" v-if="requestId !== ''">
                  <span
                    v-if="partsAnalysisData.dnafileName !== ''"
                  >{{partsAnalysisData.dnafileName}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="marginTop:0%">
            <div class="col-lg-3">
              <label>SAP Current Inventory File :</label>
            </div>
            <div class="col-lg-6 form-group">
              <div class="row">
                <div class="col-lg-1" v-if="requestId === ''">
                  <label for="fileupload2" class="file">
                    <input type="file" @change="sapFile" id="fileupload2" style="display:none">
                    <i class="fas fa-paperclip fa-2x"></i>
                  </label>
                </div>
                <div class="col-lg-8" v-if="requestId === ''">
                  <span v-if="sapfileName === ''">no file selected</span>
                  <span v-if="sapfileName !== ''">{{sapfileName}}</span>
                </div>
                <div class="col-lg-8" v-if="requestId !== ''">
                  <span
                    v-if="partsAnalysisData.sapfileName !== ''"
                  >{{partsAnalysisData.sapfileName}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row" style="marginTop:0%">
              <div class="col-lg-3"></div>
              <div class="col-lg-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1" checked="true">
                  <label class="form-check-label" for="exampleCheck1">MTBF BOM</label>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1" checked="true">
                  <label class="form-check-label" for="exampleCheck1">Use Total Stock</label>
                </div>
              </div>
          </div>-->
          <!-- Status Tracker -->
          <div style="marginTop:2%" v-if="requestId !== ''">
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 6 && partsAnalysisData.requestStatus === 'Completed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validation</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">
                      DNA File
                      Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:green">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:green"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:green"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 5 && partsAnalysisData.requestStatus === 'Processing'"
            >
              <!-- <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot"></span>
              </div>-->
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:green">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:green"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 4 && partsAnalysisData.requestStatus === 'Processing'"
            >
              <!-- <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line-green"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot-green"></span>
                <span class="line"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot"></span>
                <span class="line"></span>
                </div>
                <div class="col-lg-2">
                <span class="dot"></span>
              </div>-->
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:green">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 3 && partsAnalysisData.requestStatus === 'Processing'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 2  && partsAnalysisData.requestStatus === 'Processing'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:#bbb">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="(partsAnalysisData.stepId === 1 && partsAnalysisData.requestStatus !== 'Failed')"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:#bbb">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:#bbb">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 0 || partsAnalysisData.stepId === undefined "
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:#bbb">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:#bbb">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:#bbb">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- error -->
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 0 || partsAnalysisData.stepId === undefined  && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:red">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:#bbb">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:#bbb">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 5 && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:green">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:green"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span id="predictionDownload" class="step_no blink" style="backgroundColor:red">
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 4 && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:green">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span id="predictionDownload" class="step_no blink" style="backgroundColor:red">
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 3 && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:green">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:red">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 2 && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:green">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:red">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="row form_wizard wizard_horizontal"
              style="marginLeft:7%"
              v-if="partsAnalysisData.stepId === 1 && partsAnalysisData.requestStatus === 'Failed'"
            >
              <ul id="progress_ul" class="wizard_steps anchor">
                <li>
                  <a class="disabled" isdone="0" rel="1">
                    <span class="step_no" style="backgroundColor:green">1</span>
                    <span class="step_descr">File Validated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="2">
                    <span class="step_no" style="backgroundColor:red">2</span>
                    <span class="step_descr">DNA File loaded</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="3">
                    <span class="step_no" style="backgroundColor:#bbb">3</span>
                    <span class="step_descr">Error Records
                      <br>Filtered
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="4">
                    <span class="step_no" style="backgroundColor:#bbb">4</span>
                    <span class="step_descr">Current Inventory
                      <br>Loaded
                    </span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="5">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>5</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">BOM Calculated</span>
                  </a>
                </li>
                <li>
                  <a class="disabled" isdone="0" rel="6">
                    <span
                      id="predictionDownload"
                      class="step_no blink"
                      style="backgroundColor:#bbb"
                    >
                      <span>6</span>
                      <i style="display:none" class="fa fa-download"></i>
                    </span>
                    <span class="step_descr">Summary Calculation
                      <br>Completed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- Tracker Ends -->
          <div class="float-right" style="marginBottom:5%">
            <div class="row">
              <div class="col-lg-4" v-if="uploading">
                <button type="button" class="btn btn-danger" disabled>Back</button>
              </div>
              <div class="col-lg-4" v-if="!uploading">
                <button type="button" class="btn btn-danger" @click="cancel()">Back</button>
              </div>
              <div class="col-lg-3">
                <button
                  v-if="requestId === '' && !uploading "
                  type="button"
                  class="btn btn-success"
                  @click="formSubmit()"
                >Submit For Analysis</button>
                <button v-if="uploading " type="button" class="btn btn-success" disabled>Uploading</button>
                <button
                  v-if="requestId !== '' && (partsAnalysisData.requestStatus ==='Processing') "
                  type="button"
                  class="btn btn-success"
                  disabled
                >Processing</button>
                <button
                  v-if="requestId !== '' && partsAnalysisData.requestStatus ==='Failed'"
                  type="button"
                  class="btn btn-success"
                  @click="redirectToError()"
                >Error Details</button>
                <button
                  v-if="requestId !== '' && partsAnalysisData.requestStatus ==='Completed'"
                  type="button"
                  class="btn btn-success"
                  @click="redirectToSummary()"
                >View Details</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import router from "../../router/";
import SideNav from "@/components/sidenav/sidenav";
import headernav from "@/components/header/header";
import Multiselect from "vue-multiselect";
import Datepicker from "vuejs-datepicker";
import { mapState, mapActions } from "vuex";
import * as constant from "../constant/constant";

export default {
  name: "PartsAnalysis",

  created() {
    if (this.$route.query.id !== undefined) {
      console.log("id ---->", this.$route.query.id);
      this.requestId = this.$route.query.id;
      this.get_request_analysis_by_Id(this.requestId);
    } else {
      console.log("created");
      this.get_spare_part_analysis();
    }
  },
  components: {
    SideNav,
    Multiselect,
    Datepicker,
    headernav
  },
  computed: {},
  data() {
    console.log("Parts-Analysis", this.$store.state);
    return {
      requestId: "",
      dnafileName: "",
      sapfileName: "",
      analyisisName: "",
      customerNames: "",
      analysisType: "",
      replensihTime: "",
      date: new Date(),
      dnafile: "",
      sapfile: "",
      partsAnalysisData: "",
      partsAnalysis: "",
      partsClose: true,
      showPartsChild: false,
      postMenu: "Analysis >",
      current: "Analysis Update",
      show: false,
      label: "Loading...",
      uploading: false
    };
  },
  methods: {
    selectedCustomerName(value) {
      this.customerNames = value;
    },
    selectedAnalysisType(value) {
      console.log(value);
      this.analysisType = value;
    },
    selectedReplensihTime(value) {
      console.log(value);
      this.replensihTime = value;
    },
    handleFile(e) {
      console.log("image ------>", e.target.files);
      const file = e.target.files[0];
      if (
        file.name.endsWith("xlsx") ||
        file.name.endsWith("csv") ||
        file.name.endsWith("XLSX") ||
        file.name.endsWith("CSV") ||
        file.name.endsWith("txt") ||
        file.name.endsWith("TXT")
      ) {
        console.log(file.name);
        this.dnafileName = file.name;
        this.dnafile = file;
      } else {
        alert("error");
      }
    },
    sapFile(e) {
      console.log("image ----sap->", e.target.files);
      const file = e.target.files[0];
      if (
        file.name.endsWith("xlsx") ||
        file.name.endsWith("csv") ||
        file.name.endsWith("XLSX") ||
        file.name.endsWith("CSV") ||
        file.name.endsWith("txt") ||
        file.name.endsWith("TXT")
      ) {
        console.log(file.name);
        this.sapfileName = file.name;
        this.sapfile = file;
      } else {
        alert("error");
      }
    },
    cancel() {
      router.push("/parts/analysis/dashboard");
    },

    formSubmit() {
      let data = {
        dnafileName: this.dnafileName,
        sapfileName: this.sapfileName,
        analyisisName: this.analyisisName,
        customerNames: this.customerNames,
        analysisType: this.analysisType,
        replensihTime: this.replensihTime,
        date: new Date(),
        dnafile: this.dnafile,
        sapfile: this.sapfile
      };
      if (
        this.analyisisName !== "" &&
        this.customerNames !== "" &&
        this.analysisType !== "" &&
        this.replensihTime !== ""
      ) {
        if (this.dnafile !== "") {
          if (this.sapfile !== "") {
            this.uploading = true;
            this.post_spare_part_analysis(data);
          } else {
            alert("Please add your SAP File");
          }
        } else {
          alert("Please add your DNA File");
        }
      } else {
        alert("Please fill the Form to submit");
      }
    },

    // API calls

    get_request_analysis_by_Id(requestId) {
      fetch(
        constant.APIURL +
          "api/v1/get_steps_specific_request?request_id=" +
          requestId,
        {
          method: "GET"
        }
      )
        .then(response => {
          response.text().then(text => {
            const payload = text && JSON.parse(text);
            console.log("Get requst Analysis data ---->", payload);
            let object = {
              sapfileName: payload[0].sap_file_name,
              dnafileName: payload[0].dna_file_name,
              analyisisName: payload[0].analysis_name,
              customerNames: payload[0].customer_name,
              analysisType: payload[0].analysis_type,
              replensihTime: payload[0].replenish_time,
              date: payload[0].analysis_request_time,
              requestStatus: payload[0].requestStatus,
              stepName: payload[0].step_name,
              stepId: payload[0].step_id
            };
            this.partsAnalysisData = object;
            if (this.partsAnalysisData.requestStatus === "Processing") {
              clearInterval(window.intervalObj);
              window.intervalObj = setInterval(() => {
                this.get_request_analysis_by_Id(this.requestId);
              }, 5000);
              $(document).ready(function() {
                $("#loader-2").show();
              });
            } else {
              clearInterval(window.intervalObj);
              $(document).ready(function() {
                $("#loader-2").hide();
              });
            }
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    get_spare_part_analysis() {
      fetch(constant.APIURL + "api/v1/get_spare_part_analysis", {
        method: "GET"
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("data ---->", data);
            this.partsAnalysis = data;
          });
        })
        .catch(handleError => {
          console.log(" Error Response ------->", handleError);
        });
    },
    redirectToSummary() {
      router.push({
        path: "/parts/analysis",
        query: { id: this.requestId }
      });
    },
    redirectToError() {
      router.push({
        path: "/parts/analysis/error",
        query: { id: this.requestId }
      });
    },
    post_spare_part_analysis(data) {
      let formData = new FormData();
      console.log("loader show");
      $(document).ready(function() {
        $("#loader-2").show();
      });
      formData.append("analysis_name", data.analyisisName);
      formData.append("analysis_type", data.analysisType);
      formData.append("replenish_time", data.replensihTime);
      formData.append("customer_dna_file", data.dnafile);
      formData.append("user_email_id", localStorage.getItem("email_id"));
      formData.append("customer_name", data.customerNames);
      formData.append("sap_export_file", data.sapfile);
      console.log("formdata ----->", formData.get("analysis_name"));
      fetch(constant.APIURL + "api/v1/post_spare_part_analysis", {
        method: "POST",
        body: formData
      })
        .then(response => {
          response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log("Response from backend data ---->", data);
            this.show = false;
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
.file {
  cursor: pointer;
}
.nav-custom {
  padding-top: 20px rem !important;
}
.dot {
  height: 50px;
  width: 50px;
  margin-left: -8%;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.dot-green {
  height: 50px;
  width: 50px;
  margin-left: -8%;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
.line {
  height: 10px;
  width: 84%;
  margin-bottom: 8%;
  background-color: #bbb;
  display: inline-block;
}
.line-green {
  height: 10px;
  width: 84%;
  margin-bottom: 8%;
  background-color: green;
  display: inline-block;
}
.line-red {
  height: 10px;
  width: 84%;
  margin-bottom: 8%;
  background-color: red;
  display: inline-block;
}
.dot-red {
  height: 50px;
  width: 50px;
  margin-left: -8%;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
}
.in-progress {
  cursor: pointer;
  font-size: 14px;
}
.myBreadCrumb {
  margin-top: -2%;
  margin-bottom: 2%;
}
.form_wizard .stepContainer {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0 solid #ccc;
  overflow-x: hidden;
}
.wizard_horizontal ul.wizard_steps {
  display: table;
  list-style: none;
  position: relative;
  width: 100%;
  margin: 0 0 20px;
}
.wizard_horizontal ul.wizard_steps li {
  display: table-cell;
  text-align: center;
}
.wizard_horizontal ul.wizard_steps li a,
.wizard_horizontal ul.wizard_steps li:hover {
  display: block;
  position: relative;
  -moz-opacity: 1;
  filter: alpha(opacity=100);
  opacity: 1;
  color: #666;
}
.wizard_horizontal ul.wizard_steps li a:before {
  content: "";
  position: absolute;
  height: 4px;
  background: #ccc;
  top: 20px;
  width: 100%;
  z-index: 4;
  left: 0;
}
.wizard_horizontal ul.wizard_steps li a.disabled .step_no {
  background: #ccc;
}
.wizard_horizontal ul.wizard_steps li a .step_no {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 100px;
  display: block;
  margin: 0 auto 5px;
  font-size: 16px;
  text-align: center;
  position: relative;
  z-index: 5;
}
.wizard_horizontal ul.wizard_steps li a.selected:before,
.step_no {
  background: #34495e;
  color: #fff;
}
.wizard_horizontal ul.wizard_steps li a.done:before,
.wizard_horizontal ul.wizard_steps li a.done .step_no {
  background: #1abb9c;
  color: #fff;
}
.wizard_horizontal ul.wizard_steps li:first-child a:before {
  left: 50%;
}
.wizard_horizontal ul.wizard_steps li:last-child a:before {
  right: 50%;
  width: 50%;
  left: auto;
}
</style>
