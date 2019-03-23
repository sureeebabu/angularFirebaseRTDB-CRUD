import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private custService: CustomerService) { }
  customerArray = [];
  showDeletedMsg: boolean;
  searchText: string;
  ngOnInit() {
    this.searchText = '';
    this.custService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Are You Sure to delete this record')) {
      this.custService.deleteCustomer($key);
      this.showDeletedMsg = true;
      setTimeout(() => this.showDeletedMsg = false, 3000);
    }
  }

  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
  }
}
