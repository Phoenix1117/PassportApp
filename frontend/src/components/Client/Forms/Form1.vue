<template>
  <div style="background-image: url('img/bg24.jpg')">
    <h3>PERSONAL DETAILS</h3>
    <p>
      Your full name (as shown on your birth certificate. Confirmation of your full name certified copy of full birth
      certificate OR excerpt of full birth record).
    </p>

    <!-- Personal Name -->
    <div class="form-row">
      <div class="col">
        <input
          type="text"
          v-model="lastName"
          name="first_name"
          class="form-control col-50"
          placeholder="Last Name (family name)"
        >
      </div>
      <div class="col">
        <input
          required
          type="text"
          v-model="firstName"
          name="last_name"
          class="form-control mLeft1 col-50"
          placeholder="First (given name)"
        >
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <input
          type="text"
          v-model="middleName"
          name="middle_name"
          class="form-control col-50"
          placeholder="Middle Name(s)"
        >
      </div>
      <div class="col">
        <input
          type="text"
          v-model="otherName"
          name="other_name"
          class="form-control mLeft1 col-50"
          placeholder="Other Name(s)"
        >
      </div>
    </div>

    <!-- Current Name -->
    <p>If your current name is different from above, click here.</p>
    <div class="form-row">
      <div class="col">
        <input
          type="text"
          v-model="current.lastName"
          name="current_first_name"
          class="form-control col-50"
          placeholder="Last Name (family name)"
        >
      </div>
      <div class="col">
        <input
          type="text"
          v-model="current.firstName"
          name="current_last_name"
          class="form-control mLeft1 col-50"
          placeholder="First (given name)"
        >
      </div>
    </div>

    <div class="form-row">
      <div class="col">
        <input
          type="text"
          v-model="current.middleName"
          name="current_middle_name"
          class="form-control col-50"
          placeholder="Middle Name(s)"
        >
      </div>
      <div class="col">
        <input
          type="text"
          v-model="current.otherName"
          name="current_other_name"
          class="form-control mLeft1 col-50"
          placeholder="Other Name(s)"
        >
      </div>
    </div>

    <div class="form-row">
      <div class="col">
        <div class="styled-select clearfix">
          <select class="wide form-control" name="name_change" [(ngModel)]="input.nameChangeReason">
            <option [ngValue]="undefined" disabled selected class="selected">Method of name change</option>
            <option [value]="'Marriage'">Marriage</option>
            <option [value]="'Principal_Spouse of a Principal ApplicantApplicant'">
              Deed
              Poll
            </option>
            <option [value]="'Spouse'">Adoption</option>
            <option [value]="'Qualifying_dependent_of_a_Principal_Applicant'">Other</option>
          </select>
        </div>
      </div>
    </div>

    <p>Name in Ethnic Script</p>
    <div class="form-group">
      <textarea v-model="ethnicScript.name" name="name_ethnic" class="form-control"></textarea>
    </div>

    <div class="form-row">
      <div class="col">
        <input
          type="text"
          v-model="ethnicScript.dob"
          name="ethnic_dob"
          class="form-control mLeft1 col-20"
          placeholder="Date of Birth(DD/MM/YYYY)"
          bsDatepicker
          [placement]="datePickerOptions.placement"
          [bsConfig]="datePickerOptions.config"
        >
      </div>
      <div class="col">
        <input
          type="text"
          v-model="ethnicScript.placeOfBirth"
          name="ethnic_country"
          class="form-control mLeft1 col-30"
          placeholder="Place and Country of Birth"
        >
      </div>
      <div class="col">
        <select
          class="wide form-control"
          name="ethnic_gender"
          [(ngModel)]="input.ethnicScript.gender"
        >
          <option [ngValue]="undefined" disabled selected class="selected">Gender</option>
          <option [value]="'Male'">Male</option>
          <option [value]="'Female'">Female</option>
          <option [value]="'Others'">Others</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <!-- <input type="text" [(ngModel)]='input.ethnicScript.citizenship' name="first_name" class="form-control  col-50"
        placeholder="Citizenship at Birth">-->
        <input
          type="text"
          v-model="input.ethnicScript.citizenship"
          name="ethnic_citizenship"
          class="form-control col-50"
          placeholder="Citizenship at Birth"
          [typeahead]="$country"
          [typeaheadOptionsLimit]="7"
          [typeaheadMinLength]="0"
        >
      </div>
      <div class="col"></div>
    </div>

    <p>Do you hold, or have you ever held any other citizenship?</p>
    <div class="row">
      <div class="custom-control custom-radio col-md-1">
        <input
          type="radio"
          [(ngModel)]="input.haveOtherCitizenShip"
          [value]="1"
          class="custom-control-input"
          id="citizenship"
          name="groupcitizenship"
        >
        <label class="custom-control-label" for="citizenship">Yes</label>
      </div>
      <div class="custom-control custom-radio col-md-1">
        <input
          type="radio"
          [(ngModel)]="input.haveOtherCitizenShip"
          [value]="0"
          class="custom-control-input"
          id="citizenship-false"
          name="groupcitizenship"
          checked
        >
        <label class="custom-control-label" for="citizenship-false">No</label>
      </div>
    </div>

    <p *ngIf="input.haveOtherCitizenShip">
      Please specify the country or countries and how you acquired
      citizenship.
      List any dates of any changes of citizenship including the place at which such
      changes were recorded. Proof of other citizenship (certificate of Citizenship)
    </p>
    <div *ngIf="input.haveOtherCitizenShip" class="form-group">
      <textarea [(ngModel)]="input.otherCitizenShip" class="form-control" name="other_citizenship"></textarea>
    </div>
    <p>Do you hold, or have you ever held permanent residency in any country?</p>
    <div class="row marginLR0 declare">
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.havePermanentResidencyInOtherCountry"
          [value]="1"
          type="radio"
          class="custom-control-input"
          id="groupresidency1"
          name="groupresidency"
        >
        <label class="custom-control-label" for="groupresidency1">Yes</label>
      </div>
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.havePermanentResidencyInOtherCountry"
          [value]="0"
          type="radio"
          class="custom-control-input"
          id="groupresidency2"
          name="groupresidency"
          checked
        >
        <label class="custom-control-label" for="groupresidency2">No</label>
      </div>
    </div>

    <p *ngIf="input.havePermanentResidencyInOtherCountry">
      Please specify the country or countries and how you
      acquired permanent residency. List any dates of any changes of permanent residency including the place
      at which such changes were recorded. Proof of permanent residency (Permanent Resident Card or certificate)
    </p>
    <div *ngIf="input.havePermanentResidencyInOtherCountry" class="form-group">
      <textarea
        [(ngModel)]="input.permanentResidencyInOtherCountry"
        class="form-control"
        name="countries_lived"
      ></textarea>
    </div>

    <p>Do you have a work permit which enables you to work in any country?</p>
    <div class="row marginLR0 declare">
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.haveWorkpermitInOtherCountry"
          [value]="1"
          type="radio"
          class="custom-control-input"
          id="grouppermit1"
          name="grouppermit"
        >
        <label class="custom-control-label" for="grouppermit1">Yes</label>
      </div>

      <!-- Group of default radios - option 2 -->
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.haveWorkpermitInOtherCountry"
          [value]="0"
          type="radio"
          class="custom-control-input"
          id="grouppermit2"
          name="grouppermit"
          checked
        >
        <label class="custom-control-label" for="grouppermit2">No</label>
      </div>
    </div>

    <p *ngIf="input.haveWorkpermitInOtherCountry">
      Please list the names of the country or countries in which you are
      permitted to work.
    </p>
    <div *ngIf="input.haveWorkpermitInOtherCountry" class="form-group">
      <textarea
        [(ngModel)]="input.workpermitInOtherCountry"
        class="form-control"
        name="other_workpermit"
      ></textarea>
    </div>

    <p>Have you ever served in the armed forces?</p>
    <div class="row">
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.haveServedInArmy"
          [value]="1"
          type="radio"
          class="custom-control-input"
          id="grouparmy1"
          name="grouparmy"
        >
        <label class="custom-control-label" for="grouparmy1">Yes</label>
      </div>

      <!-- Group of default radios - option 2 -->
      <div class="custom-control custom-radio col-md-1">
        <input
          [(ngModel)]="input.haveServedInArmy"
          [value]="0"
          type="radio"
          class="custom-control-input"
          id="grouparmy2"
          name="grouparmy"
          checked
        >
        <label class="custom-control-label" for="grouparmy2">No</label>
      </div>
    </div>

    <p *ngIf="input.haveServedInArmy">
      Please provide details including branch, date of entry
      and separation and ranking at separation. Proof of service in the armed forces (Certified copy of
      military record).
    </p>

    <div *ngIf="input.haveServedInArmy">
      <div *ngFor="let army of input.armyService; let index=index;">
        <div class="form-row">
          <div class="col">
            <input
              type="text"
              name="army_branch_{{index}}"
              [(ngModel)]="army.branch"
              class="form-control col-25"
              placeholder="Branch"
            >
          </div>
          <div class="col">
            <input
              type="text"
              name="army_doe_{{index}}"
              [(ngModel)]="army.doe"
              class="form-control mLeft1 col-25"
              placeholder="Date of Entry"
              bsDatepicker
              [placement]="datePickerOptions.placement"
              [bsConfig]="datePickerOptions.config"
            >
          </div>
          <div class="col">
            <input
              type="text"
              name="army_dos_{{index}}"
              [(ngModel)]="army.dos"
              class="form-control mLeft1 col-25"
              placeholder="Date of Separation"
              bsDatepicker
              [placement]="datePickerOptions.placement"
              [bsConfig]="datePickerOptions.config"
            >
          </div>
          <div class="col">
            <input
              type="text"
              name="army_rank_{{index}}"
              [(ngModel)]="army.rank"
              class="form-control mLeft1 col-22"
              placeholder="Rank at Separation"
            >
          </div>
        </div>
        <p *ngIf="input.armyService.length > 1">
          <button type="button" class="btn btn-primary" (click)="removeArmyService(index)">Remove</button>
        </p>
      </div>
    </div>

    <p *ngIf="input.haveServedInArmy">
      <button type="button" (click)="addArmyService()" class="btn btn-primary">Add one more Service</button>
    </p>
  </div>
</template>

<script>
import router from "../../../router/";

export default {
  name: "Form1",
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

