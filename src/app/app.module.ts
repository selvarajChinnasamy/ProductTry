import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import{ ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { HomeComponent } from './home/home.component';
import {  AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CompanyAddComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlSL508P4TNSpIh8rD8rdoraXRyrK-nGg',
      libraries: ["places"]
}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
