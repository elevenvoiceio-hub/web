import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { CommonService } from './services/common-service/common-service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ai-awaaz';
  loader = false;

  constructor(private commonService: CommonService) {
    this.commonService.loader.subscribe((value) => {
      this.loader = value;
    });
    this.commonService.toaster.subscribe((message) => {
      if (message) {
        toast(message);
      }
    });
  }
}
