import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserViewProductService } from './../../services/user.view.product.service';
import { Transaction } from './../../interfaces/Transaction';

@Component({
  selector: 'app-historical-user',
  templateUrl: './historical-user.component.html',
  styleUrls: ['./historical-user.component.css']
})
export class HistoricalUserComponent implements AfterViewInit, OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false;
  
  displayedColumns: string[] = ['tipo_transaccion', 'monto', 'fecha_transaccion', 'descripcion'];
  dataSource = new MatTableDataSource<Partial<Transaction>>([]);

  constructor(private userViewProductService: UserViewProductService) {}

  ngOnInit() {
    this.loading = true;
    this.userViewProductService.getTransation().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
