import { Component } from '@angular/core';
import { UsersTable } from './users-table/users-table';
import { PageHeader } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-users',
  imports: [UsersTable, PageHeader],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {}
