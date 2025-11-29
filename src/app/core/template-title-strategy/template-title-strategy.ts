import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  appName =  environment.applicationName;
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | ${this.appName}`);
    }
  }
}
