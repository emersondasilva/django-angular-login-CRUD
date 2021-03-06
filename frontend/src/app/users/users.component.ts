import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { UsersItem } from './users-item.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

@Injectable()
export class UsersComponent implements OnInit {

  items: UsersItem[];
  error: any;
  order = 'first_name';

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.api.getAllUsers().subscribe(
      (items: UsersItem[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  getUsers = () => {
    this.api.getAllUsers().subscribe(
      data => this.items = data
      ,
      error => {
        console.log('Aconteceu um erro', error.message);
      }
    );
  }

  editClicked = (user) => {
    this.router.navigate(['users/user-edit', user.id]);
  }

  deleteClicked = (user) => {
    this.router.navigate(['users/user-delete', user.id]);
  }

  newUser() {
    this.router.navigate(['users/user-new']);
  }
}
