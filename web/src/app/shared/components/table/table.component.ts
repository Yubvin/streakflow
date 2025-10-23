import { Component, input } from '@angular/core';

/**
 * Table components - simple wrappers around native HTML table elements
 * These are DUMB components - presentation only
 */

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <div class="relative w-full overflow-x-auto">
      <table class="w-full caption-bottom text-sm">
        <ng-content />
      </table>
    </div>
  `
})
export class TableComponent {}

@Component({
  selector: 'app-table-header',
  standalone: true,
  template: `
    <thead class="[&_tr]:border-b">
      <ng-content />
    </thead>
  `
})
export class TableHeaderComponent {}

@Component({
  selector: 'app-table-body',
  standalone: true,
  template: `
    <tbody class="[&_tr:last-child]:border-0">
      <ng-content />
    </tbody>
  `
})
export class TableBodyComponent {}

@Component({
  selector: 'app-table-row',
  standalone: true,
  template: `
    <tr class="hover:bg-muted/50 border-b transition-colors">
      <ng-content />
    </tr>
  `
})
export class TableRowComponent {}

@Component({
  selector: 'app-table-head',
  standalone: true,
  template: `
    <th class="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
      <ng-content />
    </th>
  `
})
export class TableHeadComponent {}

@Component({
  selector: 'app-table-cell',
  standalone: true,
  template: `
    <td class="p-2 align-middle whitespace-nowrap">
      <ng-content />
    </td>
  `
})
export class TableCellComponent {}

