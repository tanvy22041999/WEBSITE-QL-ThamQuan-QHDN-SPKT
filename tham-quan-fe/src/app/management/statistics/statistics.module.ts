import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { statisticsRoutes } from './statistics.routing';
import { ListStatisticsComponent } from './list-statistics/list-statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountTravelComponent } from './count-travel/count-travel.component';
import { CountAnswerComponent } from './count-answer/count-answer.component';

@NgModule({
  declarations: [ListStatisticsComponent, CountTravelComponent, CountAnswerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,

    // Routes
    RouterModule.forChild(statisticsRoutes),
  ]
})
export class StatisticsModule { }
