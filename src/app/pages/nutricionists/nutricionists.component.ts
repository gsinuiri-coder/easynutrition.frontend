import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nutricionist } from '../../models/nutricionist';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataNutricionistService } from '../../services/http-data-nutricionist.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nutricionists',
  templateUrl: './nutricionists.component.html',
  styleUrls: ['./nutricionists.component.css']
})
export class NutricionistsComponent implements OnInit, AfterViewInit {

  @ViewChild('nutricionistForm', { static: false })
  nutricionistForm: NgForm;
  nutricionistData: Nutricionist;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userName', 'password', 'name', 'lastName', 'university', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataNutricionistService, private router: Router) {
    this.nutricionistData = {} as Nutricionist;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllNutricionists();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllNutricionists(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }
  editItem(element): void {
    console.log(element);
    this.nutricionistData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.nutricionistForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Nutricionist) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addNutricionist(): void {
    const newNutricionist = {userName: this.nutricionistData.userName, password: this.nutricionistData.password,
      name: this.nutricionistData.name, lastName: this.nutricionistData.lastName, university: this.nutricionistData.university};

    this.httpDataService.createItem(newNutricionist).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateNutricionist(): void {
    this.httpDataService.updateItem(this.nutricionistData.id, this.nutricionistData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Nutricionist) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.nutricionistForm.form.valid) {
      if (this.isEditMode) {
        this.updateNutricionist();
      } else {
        this.addNutricionist();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddNutricionist(): void {
    this.router.navigate(['/nutricionists/new']).then(() => null);
  }
  navigateToEditNutricionist(nutricionistId): void {
    this.router.navigate([`/nutricionists/${nutricionistId}`]).then(() => null);
  }
  refresh(): void {
    console.log('about to reload');
    this.getAllNutricionists();
  }
}

