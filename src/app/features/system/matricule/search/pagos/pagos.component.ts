import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    TableModule
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {
  @Input() charges: any[] = [];
  historial: any[] = [];
}
