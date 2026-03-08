import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  ColumnDef,
  ColumnFiltersState,
  createAngularTable,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/angular-table';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

import { ActionDropdown } from './action-dropdown/action-dropdown';
import { TableHeadSelection, TableRowSelection } from './selection-column';
import { SortHeaderButton } from '../../../../../shared/components/sort-header-button/sort-header-button';
import {
  HlmNumberedPagination,
  HlmNumberedPaginationQueryParams,
} from '@spartan-ng/helm/pagination';

@Component({
  selector: 'app-users-table',
  imports: [
    FlexRenderDirective,
    FormsModule,
    HlmDropdownMenuImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    HlmNumberedPagination,
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  protected _filterChanged(event: Event) {
    this._table.setGlobalFilter((event.target as HTMLInputElement).value);
  }
  public readonly page = signal(1);
  public readonly pageSize = signal(1);

  constructor() {
    effect(() => {
      this._table.setPageIndex(this.page() - 1);
    });

    effect(() => {
      this._table.setPageSize(this.pageSize());
    });
  }

  protected readonly _columns: ColumnDef<Payment>[] = [
    {
      id: 'select',
      header: () => flexRenderComponent(TableHeadSelection),
      cell: () => flexRenderComponent(TableRowSelection),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: () => flexRenderComponent(SortHeaderButton, { inputs: { header: '' } }),
      cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
    },
    {
      accessorKey: 'email',
      id: 'email',
      header: () => flexRenderComponent(SortHeaderButton, { inputs: { header: '' } }),
      cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
    },
    {
      accessorKey: 'amount',
      id: 'amount',
      header: () => flexRenderComponent(SortHeaderButton, { inputs: { header: '' } }),
      cell: (info) => {
        const amount = parseFloat(info.getValue<string>());
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return `<div>${formatted}</div>`;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => flexRenderComponent(ActionDropdown),
    },
  ];

  private readonly _columnFilters = signal<ColumnFiltersState>([]);
  private readonly _sorting = signal<SortingState>([]);
  private readonly _rowSelection = signal<RowSelectionState>({});
  private readonly _columnVisibility = signal<VisibilityState>({});

  protected readonly _table = createAngularTable<Payment>(() => ({
    data: PAYMENT_DATA,
    columns: this._columns,
    onSortingChange: (updater) => {
      updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
    },
    onColumnFiltersChange: (updater) => {
      updater instanceof Function
        ? this._columnFilters.update(updater)
        : this._columnFilters.set(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      updater instanceof Function
        ? this._columnVisibility.update(updater)
        : this._columnVisibility.set(updater);
    },
    onRowSelectionChange: (updater) => {
      updater instanceof Function
        ? this._rowSelection.update(updater)
        : this._rowSelection.set(updater);
    },
    state: {
      sorting: this._sorting(),
      columnFilters: this._columnFilters(),
      columnVisibility: this._columnVisibility(),
      rowSelection: this._rowSelection(),
    },
  }));

  protected _filterChange(email: Event) {
    const target = email.target as HTMLInputElement;
    const typedValue = target.value;
    this._table.setGlobalFilter(typedValue);
  }
}

const PAYMENT_DATA: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
];
