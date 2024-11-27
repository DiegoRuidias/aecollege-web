import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FileRegisterService } from '../alumnos/service/file-register.service';
import { SettingsService } from '../../../../shared/layout/service/settings.service';
import { PeriodsService } from '../../../settings/periods/service/periods.service';
import { forkJoin } from 'rxjs';
import { state } from './model/state.model';
import { StatePipe } from './pipes/state.pipe';
import { StateLabelPipe } from './pipes/state-label.pipe';
import { AvatarLabelPipe } from './pipes/avatar-label.pipe';
import { NameLabelPipe } from './pipes/name-label.pipe';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    ToolbarModule,
    InputTextModule,
    PaginatorModule,
    AvatarModule,
    TagModule,
    CardModule,
    StatePipe,
    StateLabelPipe,
    AvatarLabelPipe,
    NameLabelPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent implements OnInit {
  
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)
  fileRegisterService = inject(FileRegisterService);
  settingsService = inject(SettingsService);
  periodService = inject(PeriodsService);
  private navigationParams = {};
  @Input("page") pageNumber!: number;
  @Input("size") pageSize!: number;

  searchText!: string;
  page: number = 0;
  size: number = 10;
  first: number = 0;

  timeout: any = null;
  matriculeList: any[] = [];
  periodList: any[] = [];
  period: string = '';
  totalRecords!: number;
  state = state;

  ngOnInit(): void {
        if (this.pageNumber)
            this.page = this.pageNumber;
        if (this.pageSize)
            this.size = this.pageSize;
        if (this.pageNumber && this.pageSize)
            this.first = this.page * this.size;
    this.period = this.settingsService.getSettings().periodId;
    this.loadMatriculeList();
  }

  loadMatriculeList() {
    const fileRequest = this.fileRegisterService.findAll(this.page, this.size,this.period, this.searchText);
    const periodRequest = this.periodService.findAll();

    forkJoin([fileRequest,periodRequest]).subscribe(([fileRegister,period])=>{
      this.matriculeList = fileRegister;
      this.totalRecords = fileRegister.length;
      this.periodList = period;
    });

    this.navigationParams = {
      page: this.page,
      size: this.size
    };

    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: this.navigationParams,
      queryParamsHandling: 'merge'
    });
  }
  onKeySearch(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(function () {
    if (event.keyCode != 13) {
        $this.executeSearch();
    }
    }, 500);
  }

  executeSearch(): void {
      this.loadMatriculeList();
  }

  public onPageChange(event: any): void {
    this.size = event.rows;  
    this.page = event.page;
    this.first = event.first;
    this.loadMatriculeList();
  }

  changePeriod(event: any){
    this.loadMatriculeList();
  } 

  viewDetail(item: any){
    this.router.navigate(["system/consultar-matricula",item.id]);
  }
}
