import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  selected = ['palani'];
  companyForm: FormGroup;
  items: any[] = [];
  constructor(private formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  //form Requirements
  locations(): FormGroup {
    return this.formBuilder.group({
      location: ['', [Validators.required]],
    });
  }
  round(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      discription: ['', [Validators.required]],
    });
  }
  departments(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      skills: ['', [Validators.required]],
    });
  }
  createPositions(): FormGroup {
    return this.formBuilder.group({
      position: ['', [Validators.required]],
      ctc: ['', [Validators.required]],
      Qualifications: ['', [Validators.required]],
      rounds: this.formBuilder.array([this.round()]),
      depts: this.formBuilder.array([this.departments()]),
      description: ['', [Validators.required]],
    });
  }
  /**/
  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyLink: ['', [Validators.required]],
      date: ['', [Validators.required]],
      positions: this.formBuilder.array([this.createPositions()]),
      JobLocations: this.formBuilder.array([this.locations()]),
    });
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
    this.companyForm.get('JobLocations').valueChanges.debounceTime(1000).subscribe(value=>{
      if(value[0].location!='')
      {
        this.selected.push(value[0].location);         
      }
    });
  }
  get positions(): FormArray {
    return <FormArray>this.companyForm.get('positions');
  }
  addPositions(): void {
    this.positions.push(this.createPositions());
  }
  get JobLocations(): FormArray {
    return <FormArray>this.companyForm.get('JobLocations');
  }
  get rounds(): FormArray {
    return <FormArray>this.positions.controls[0].get('rounds');
  }
  addRounds(): void {
    this.rounds.push(this.round());
  }
  get department(): FormArray {
    return <FormArray>this.positions.controls[0].get('depts');
  }
  addDepartments(): void {
    this.department.push(this.departments());
  }
  remove(i){
    this.selected.splice(i,1);
  }
}
