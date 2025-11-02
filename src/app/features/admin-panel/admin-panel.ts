import { Component } from '@angular/core';
import { AdminSideNav } from './components/admin-side-nav/admin-side-nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [AdminSideNav, RouterModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminDashboard {}
