import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DropDownService } from './services/drop-down.service';
import { IPersonModel } from './interface/person-model';
// import { NgForm } from '@angular/forms';
import { InputDataService } from './services/input-data.service';
// FormGroup FormControl imported from anuglar/forms
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DropDownService, InputDataService]
})
export class AppComponent implements OnInit {
  courseForm: FormGroup;
  // @ViewChild('f') courseForm: NgForm;
  personDetail: IPersonModel;
  dropDownArr = [];
  selectedOption = null;
  personsList: IPersonModel[] = [];

  onSubmit(): void {
    // adds the user submited data to personDetail object
    this.personDetail.chosenCourse = this.selectedOption;
    this.personDetail.name = this.courseForm.value.username;
    this.personDetail.email = this.courseForm.value.email;
    this.personDetail.address = this.courseForm.value.address;
    this.fieldData.setPersonData({ ...this.personDetail });
    this.personsList.push({ ...this.personDetail });
    console.log({ ...this.personDetail });
    this.courseForm.reset();
    console.log(this.personsList);
    console.log(this.courseForm);
  }
  // service dependecy injected into the constructor
  constructor(public dropdown: DropDownService, public fieldData: InputDataService) {
  }
  // resets the form on clicking the reset button
  resetForm(): void {
    this.courseForm.reset();
  }
  // sets the dropdownlist values on intialization
  ngOnInit() {
    // created FormGroup and related FormControls
    this.courseForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null),
      address: new FormControl(null),
      select: new FormControl(null)
    });
    this.dropDownArr = this.dropdown.getData();
    // this.personDetail = {
    //   name: '',
    //   email: '',
    //   address: '',
    //   chosenCourse: ''
    // };
    this.personDetail = this.fieldData.getPersonData();
    console.log(this.courseForm);
  }

}
