import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';

import {
  MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule,
  MatProgressBarModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MatToolbarModule, MatMenuModule, MatPaginatorModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule
} from '@angular/material';
import { HomeComponent } from './nav-views/home/home.component';
import { AddPostComponent } from './nav-views/add-post/add-post.component';
import { PostComponent } from './nav-views/post/post.component';
import { PlayComponent } from './nav-views/play/play.component';
import { AboutComponent } from './nav-views/about/about.component';
import { NotFoundComponent } from './nav-views/not-found/not-found.component';
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    PlayComponent,
    AboutComponent,
    NotFoundComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule,
    MatProgressBarModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatToolbarModule, MatMenuModule, MatPaginatorModule,
    MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
    
    RouterModule.forRoot([
      {path: '', component: HomeComponent },
      {path: 'post/:post', component: PostComponent },
      {path: 'add', component: AddPostComponent },
      {path: 'play/:magnet', component: PlayComponent },
      {path: 'about', component: AboutComponent },
      {path: '**', component: NotFoundComponent },      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
