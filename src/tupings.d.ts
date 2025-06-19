declare module 'ngx-bootstrap/component-loader' {
  import { Injector, RendererFactory2 } from '@angular/core';

  export class ComponentLoaderFactory {
    constructor(injector: Injector, rendererFactory: RendererFactory2);
  }
}
