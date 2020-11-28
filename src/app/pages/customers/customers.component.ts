import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../models/customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataCustomerService } from '../../services/http-data-customer.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  @ViewChild('customerForm', { static: false })
  customerForm: NgForm;
  customerData: Customer;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userName', 'password', 'name', 'lastName', 'typeFeeding', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataCustomerService, private router: Router) {
    this.customerData = {} as Customer;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllCustomers();
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
  getAllCustomers(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }
  editItem(element): void {
    console.log(element);
    this.customerData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.customerForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Customer) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addCustomer(): void {
    const newCustomer = {userName: this.customerData.userName, password: this.customerData.password,
      name: this.customerData.name, lastName: this.customerData.lastName, university: this.customerData.typeFeeding};

    this.httpDataService.createItem(newCustomer).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateCustomer(): void {
    this.httpDataService.updateItem(this.customerData.id, this.customerData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Customer) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.customerForm.form.valid) {
      if (this.isEditMode) {
        this.updateCustomer();
      } else {
        this.addCustomer();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddCustomer(): void {
    this.router.navigate(['/customers/new']).then(() => null);
  }
  navigateToEditCustomer(customerId): void {
    this.router.navigate([`/customers/${customerId}`]).then(() => null);
  }
  refresh(): void {
    console.log('about to reload');
    this.getAllCustomers();
  }
}

