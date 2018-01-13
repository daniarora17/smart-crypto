import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconRegistry, MatIconModule, MatTableModule, MatSortModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { HeaderComponent } from './header/header.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SharedServiceService } from './shared-service.service';



@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    HeaderComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
