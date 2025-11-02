import { Component } from '@angular/core';
import { UsersTable } from './users-table/users-table';

@Component({
  selector: 'app-users',
  imports: [UsersTable],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {}
