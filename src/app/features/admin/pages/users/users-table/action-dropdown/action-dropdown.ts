import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { type CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import type { Payment } from '../users-table';

@Component({
  selector: 'app-action-dropdown',
  imports: [HlmButtonImports, NgIcon, HlmIconImports, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideEllipsis })],
  templateUrl: './action-dropdown.html',
  styleUrl: './action-dropdown.css',
})
export class ActionDropdown {
  private readonly _context = injectFlexRenderContext<CellContext<Payment, unknown>>();

  copyPaymentId() {
    const payment = this._context.row.original;
    navigator.clipboard.writeText(payment.id);
  }
}
