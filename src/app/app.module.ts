import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from "ngx-toastr";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxImageCompressService } from "ngx-image-compress";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { DatePipe } from "@angular/common";
import { StorageService } from "./shared/services/storage.service";
import { JwtInterceptor } from "./shared/auth/jwt-interceptor";
import { CookieService } from "ngx-cookie-service";
import { DragulaModule, DragulaService } from "ng2-dragula";
import { LoaderService } from "./shared/services/loader.service";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
    NgSelectModule,
    DragulaModule.forRoot(),
  ],
  providers: [
    DatePipe,
    NgxImageCompressService,
    AuthService,
    AuthGuard,
    StorageService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    CookieService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS,
    DragulaService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
