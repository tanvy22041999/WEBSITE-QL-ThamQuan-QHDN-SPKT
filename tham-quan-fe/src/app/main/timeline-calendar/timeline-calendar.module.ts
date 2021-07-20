import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timelineCalendar } from './timeline-calendar.routing';
import { ListTimelineCalendarComponent } from './list-timeline-calendar/list-timeline-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import resourceTimeline from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { FormTourDetailsComponent } from './form-tour-details/form-tour-details.component'; // for dateClick

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  resourceTimeline,
  interactionPlugin
]);

@NgModule({
  declarations: [ListTimelineCalendarComponent, FormTourDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    // Routes
    RouterModule.forChild(timelineCalendar),
  ],
})
export class TimelineCalendarModule { }
