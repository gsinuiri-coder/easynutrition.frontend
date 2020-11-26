import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Diet} from '../../models/diet';
import { HttpDataDietService } from '../../services/http-data-diet.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('dietForm', { static: false })
  dietForm: NgForm;
  isEditMode = false;
  dietId: number;
  dietData: Diet = new Diet();
  defaultDiet = { id: 0, title: '', description: ''};

  constructor(private httpDataDietService: HttpDataDietService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dietId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveDiet(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetDiet();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToDiets(): void {
    this.router.navigate(['/diets']);
  }
  resetDiet(): void {
    this.dietData = this.defaultDiet;
  }
  retrieveDiet(id): void {
    this.httpDataDietService.getItem(id)
      .subscribe((response: Diet) => {
        this.dietData = {} as Diet;
        this.dietData = _.cloneDeep(response);
        console.log(response);
        console.log(this.dietData);
      });
  }
  addDiet(): void {
    const newDiet = {title: this.dietData.title, description: this.dietData.description};
    this.httpDataDietService.createItem(newDiet)
      .subscribe(() => {
        this.navigateToDiets();
      });
  }
  cancelEdit(): void {
    this.navigateToDiets();
  }

  updateDiet(): void {
    this.httpDataDietService.updateItem(this.dietData.id, this.dietData as Diet)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToDiets();
  }
  onSubmit(): void {
    if (this.dietForm.form.valid) {
      console.log(this.dietData);
      if (this.isEditMode) {
        this.updateDiet();
      } else {
        this.addDiet();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}

