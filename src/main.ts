import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, importProvidersFrom, inject, RendererFactory2 } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    ComponentLoaderFactory,
    {
      provide: BsModalService,
      useFactory: () => {
        const rendererFactory = inject(RendererFactory2);
        const componentLoaderFactory = inject(ComponentLoaderFactory);
        const defaultOptions = inject(ModalOptions);

        const service = new BsModalService(rendererFactory, componentLoaderFactory, defaultOptions);

        service.config.animated = true;
        service.config.backdrop = 'static';
        service.config.focus = true;
        service.config.ignoreBackdropClick = true;
        service.config.keyboard = false;
        service.config.class = 'modal-xl';

        return service;
      }
    }
  ]
})
  .catch((err) => console.error(err));
