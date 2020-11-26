import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Progress } from '../../models/progress';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataProgressService } from '../../services/http-data-progress.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('progressForm', { static: false })
  progressForm: NgForm;
  progressData: Progress;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'weight', 'description'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataProgressService, private router: Router) {
    this.progressData = {} as Progress;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllProgress();
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
  getAllProgress(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }
  editItem(element): void {
    console.log(element);
    this.progressData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.progressForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Progress) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addProgress(): void {
    const newProgress = {weight: this.progressData.weight, description: this.progressData.description};
    this.httpDataService.createItem(newProgress).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateProgress(): void {
    this.httpDataService.updateItem(this.progressData.id, this.progressData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Progress) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.progressForm.form.valid) {
      if (this.isEditMode) {
        this.updateProgress();
      } else {
        this.addProgress();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddProgress(): void {
    this.router.navigate(['/progress/new']).then(() => null);
  }
  navigateToEditProgress(progressId): void {
    this.router.navigate([`/progress/${progressId}`]).then(() => null);
  }
  refresh(): void {
    console.log('about to reload');
    this.getAllProgress();
  }

}
