import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { injectFlexRenderContext, HeaderContext } from '@tanstack/angular-table';

@Component({
  selector: 'app-sort-header-button',
  imports: [HlmButtonImports, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideArrowUpDown })],
  templateUrl: './sort-header-button.html',
  styleUrl: './sort-header-button.css',
})
export class SortHeaderButton {
  protected readonly _context = injectFlexRenderContext<HeaderContext<any, unknown>>();
  protected filterClick() {
    this._context.column.toggleSorting(this._context.column.getIsSorted() === 'asc');
  }
  public readonly header = input('');
  protected readonly _header = computed(() => {
    return this.header() === '' ? this._context.column.id : this.header();
  });
}
