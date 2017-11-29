import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators} from '@angular/forms';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  companyForm: FormGroup;
  items: any[] = [];
  constructor(private formBuilder: FormBuilder) { }
  //form Requirements
  locations(): FormGroup {
    return this.formBuilder.group({
      location: ['', [Validators.required]],
    });
  }
  rounds(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      discription: ['', [Validators.required]],
    });
  }
  departments():FormGroup{
    return this.formBuilder.group({
    name:['',[Validators.required]],
    skills:['',[Validators.required]],
    });
  }
  createPositions(): FormGroup {
    return this.formBuilder.group({
      position: ['', [Validators.required]],
      ctc: ['', [Validators.required]],
      Qualifications:['',[Validators.required]],
      rounds:this.formBuilder.array([this.rounds()]),
      depts:this.formBuilder.array([this.departments()]),
      description: ['', [Validators.required]],
    });
  }
  /**/
  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyLink: ['', [Validators.required]],
      date:['',[Validators.required]],
      positions: this.formBuilder.array([this.createPositions()]),
      JobLocations: this.formBuilder.array([this.locations()]),
    });
  }

}
