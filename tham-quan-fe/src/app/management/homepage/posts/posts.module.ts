import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { postsRoutes } from './posts.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { FormPostsComponent } from './form-posts/form-posts.component';

@NgModule({
  declarations: [ListPostsComponent, FormPostsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    // Routes
    RouterModule.forChild(postsRoutes),
  ]
})
export class PostsModule { }
