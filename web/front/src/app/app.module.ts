import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { NavigationComponent } from './navigation/navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpModule} from '@angular/http';
import { PublicationComponent } from './publication/publication.component';
import { AddComponent } from './add/add.component';
import { MatIconRegistry } from '@angular/material/icon';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PublicationComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [MatIconRegistry],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
