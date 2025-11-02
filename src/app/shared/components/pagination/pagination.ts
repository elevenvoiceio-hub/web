import { Component, computed, effect, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
} from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'app-pagination',
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    HlmButton,
    NgIcon,
    HlmInput,
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronsLeft,
      lucideChevronsRight,
    }),
  ],
})
export class Pagination {
  data = model<any[]>([]);
  page = model<number>(1);
  rowsPerPage = model<number>(5);

  startValue = computed(() => (this.page() - 1) * this.rowsPerPage() + 1);
  endValue = computed(() => this.page() * this.rowsPerPage());
  total = computed(() => this.data().length);
  pages = computed(() => Math.ceil(this.total() / this.rowsPerPage()));

  changePage = (event: Event) => {
    const currentPage = (event.target as HTMLInputElement).valueAsNumber;
    this.page.set(currentPage);

    effect(() => {
      this.page.set(1);
      this.rowsPerPage();
    });
  };
}
