import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  historial: any[] = [
    {
      'id':1,
      'name':'hola'
    },
    {
      'id':2,
      'name':'Hola'
    }
  ]
}
