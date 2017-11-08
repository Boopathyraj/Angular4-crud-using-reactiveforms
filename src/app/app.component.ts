import { Component, OnInit } from '@angular/core';
import { Details } from "./details";
import {AppService} from "./app.service"
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  title = 'app';
  public myForm: FormGroup;
  statusCode: number;
  allStudents:Details[];
  tobeupdated: number;
  values: Object = {};

  // stud=new Details();

    constructor(private form: FormBuilder,private Student: AppService) {
    }

    ngOnInit()
    {
          this.myForm = this.form.group({            
            name:[''],
            rollno:[0],
            department:[''],
            address:['']
            });
this.getall();
    }
    save() {
    // alert(this.stud.name);
    this.Student.saveDetails(this.myForm.value)
    .subscribe(
        successCode => {
        // this.statusCode = successCode;
      
        },
      
      errorCode => this.statusCode = errorCode
      
    );
    this.getall();
  }
    getall() {
    alert("get all method");
    this.Student.getAllStudentDetails()
      .subscribe(
      data => this.allStudents = data,
     // errorCode => this.statusCode = errorCode
     );
  }

  delete(rollno: number){
    this.Student.deleteDetails(rollno)
      .subscribe(successCode => {
        // this.statusCode = successCode; 
          this.getall();
      },
      errorCode => this.statusCode = errorCode);
  }
    edit(rollno: number) {
      alert("edit");
    this.tobeupdated = rollno;
    this.Student.getDetails(rollno)
      .subscribe(data => {
        this.values = data;
        this.patchForm();
      });

  }
    patchForm() {
    console.log("details------>>>>>" + JSON.stringify(this.values));
    this.loadform();
    this.myForm.patchValue({
      name: this.values['name'],rollno:this.values['rollno'],department:this.values['department'],address:this.values['address'],
    })
    this.setDetails();
  }

  setDetails() {
    let control = <FormArray>this.myForm.controls['details'];
    this.values['details'].forEach(x => {
      control.push(this.form.group({ name: x.name, rollno: x.rollno,department: x.department,address: x.address }));
    })

  }
   loadform() {
    this.myForm = this.form.group({            
            name:[''],
            rollno:[0],
            department:[''],
            address:['']
            });
  }

  update() {
    alert("update");
    console.log(this.myForm.controls['details']);
    console.log("*******" + JSON.stringify(this.myForm.value));
    this.Student.updateDetails(this.tobeupdated, this.myForm.value)
      .subscribe(successCode => {
        //this.statusCode = successCode;
          this.getall();
      },
      errorCode => this.statusCode = errorCode);
      this.tobeupdated=0;
      // this.myForm.controls['details'] = this.form.array([]);
  }
  //   public clearArray() {
  //   this.myForm.controls['details'] = this.form.array([]);
  // }

}
