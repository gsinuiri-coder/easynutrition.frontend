import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Nutricionist} from '../../models/nutricionist';
import { HttpDataNutricionistService} from '../../services/http-data-nutricionist.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-nutricionist',
  templateUrl: './nutricionist.component.html',
  styleUrls: ['./nutricionist.component.css']
})
export class NutricionistComponent implements OnInit {
  @ViewChild('nutricionistForm', { static: false })
  nutricionistForm: NgForm;
  isEditMode = false;
  nutricionistId: number;
  nutricionistData: Nutricionist = new Nutricionist();
  defaultNutricionist = { id: 0, userName: '', password: '', name: '', lastName: '', university: ''};
  constructor(private httpDataService: HttpDataNutricionistService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nutricionistId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveNutricionist(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetNutricionist();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToNutricionists(): void {
    this.router.navigate(['/nutricionists']);
  }
  resetNutricionist(): void {
    this.nutricionistData = this.defaultNutricionist;
  }
  retrieveNutricionist(id): void {
    this.httpDataService.getItem(id)
      .subscribe((response: Nutricionist) => {
        this.nutricionistData = {} as Nutricionist;
        this.nutricionistData = _.cloneDeep(response);
        console.log(response);
        console.log(this.nutricionistData);
      });
  }
  addNutricionist(): void {
    const newNutricionist = {userName: this.nutricionistData.userName, password: this.nutricionistData.password,
      name: this.nutricionistData.name, lastName: this.nutricionistData.lastName, university: this.nutricionistData.university};
    this.httpDataService.createItem(newNutricionist)
      .subscribe(() => {
        this.navigateToNutricionists();
      });
  }
  cancelEdit(): void {
    this.navigateToNutricionists();
  }

  updateNutricionist(): void {
    this.httpDataService.updateItem(this.nutricionistData.id, this.nutricionistData as Nutricionist)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToNutricionists();
  }
  onSubmit(): void {
    if (this.nutricionistForm.form.valid) {
      console.log(this.nutricionistData);
      if (this.isEditMode) {
        this.updateNutricionist();
      } else {
        this.addNutricionist();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
