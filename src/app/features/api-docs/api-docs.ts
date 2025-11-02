import { Component } from '@angular/core';
import { Headers } from '../../shared/components/headers/headers';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-api-docs',
  imports: [Headers, Footer],
  templateUrl: './api-docs.html',
  styleUrl: './api-docs.css',
})
export class ApiDocs {}
