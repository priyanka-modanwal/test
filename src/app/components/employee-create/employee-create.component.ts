import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FormControl, FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {  
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  employeejson :any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.employeeForm = this.fb.group({
    
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      PAddressLine1: ['', [Validators.required]],
      PAddressLine2: ['', [Validators.required]],
      PCity : ['', [Validators.required]],
      PCountry: ['', [Validators.required]],
      PPinCode: ['', [Validators.required]],
      PeAddressLine1: ['', [Validators.required]],
      PeAddressLine2: ['', [Validators.required]],
      PeCity : ['', [Validators.required]],
      PeCountry: ['', [Validators.required]],
      PePinCode: ['', [Validators.required]],
      OAddressLine1: ['', [Validators.required]],
      OAddressLine2: ['', [Validators.required]],
      OCity : ['', [Validators.required]],
      OCountry: ['', [Validators.required]],
      OPinCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }


  // Choose designation with select dropdown
  updateProfile(e){
    this.employeeForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
   this.employeejson =
   {
		FirstName: this.employeeForm.controls['FirstName'].value,
		LastName: this.employeeForm.controls['LastName'].value,
		DOB:  this.employeeForm.controls['DOB'].value,
		email: this.employeeForm.controls['email'].value,
		designation: this.employeeForm.controls['designation'].value,
	    phoneNumber:this.employeeForm.controls['phoneNumber'].value,
		   presentaddress:
		   {
			  AddressLine1:this.employeeForm.controls['PAddressLine1'].value,
			  AddressLine2:this.employeeForm.controls['PAddressLine2'].value,
			  city: this.employeeForm.controls['PCity'].value,
			  Country: this.employeeForm.controls['PCountry'].value,
			  PinCode: this.employeeForm.controls['PPinCode'].value,
		  },
		   permanentaddress:
		   {
			   AddressLine1:this.employeeForm.controls['PeAddressLine1'].value,
			   AddressLine2:this.employeeForm.controls['PeAddressLine2'].value,
			   city: this.employeeForm.controls['PeCity'].value,
			   Country: this.employeeForm.controls['PeCountry'].value,
			   PinCode: this.employeeForm.controls['PePinCode'].value,
		 },
		   officeaddress: 
		   {
			   AddressLine1:this.employeeForm.controls['OAddressLine1'].value,
			   AddressLine2:this.employeeForm.controls['OAddressLine2'].value,
			   city: this.employeeForm.controls['OCity'].value,
			   Country: this.employeeForm.controls['OCountry'].value,
			   PinCode: this.employeeForm.controls['OPinCode'].value
		}
	
}
   
    //alert(this.employeeForm.controls['FirstName'].value);
    if (!this.employeeForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.employeejson).subscribe(
        (res) => {
          alert('hghg');
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}