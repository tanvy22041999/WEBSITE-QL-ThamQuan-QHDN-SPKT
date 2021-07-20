import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homePageRoutes } from './homepage.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostTplComponent } from './post-tpl/post-tpl.component';
import { CardTemplateComponent } from './card-template/card-template.component';
import { ListPostsComponent } from './list-posts/list-posts.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostTplComponent,
    CardTemplateComponent,
    ListPostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Routes
    RouterModule.forChild(homePageRoutes),
  ]
})
export class HomePageModule { }
