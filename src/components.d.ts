/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ControlEvent,
} from './components/leaflet-entity-selector/constant';

export namespace Components {
  interface PwcLeafletEntitySelector {
    /**
    * Extended leaflet configuration for pwc-leaflet-entity-selector
    * @prop config.autoAdd: If enabled, auto add control to given map instance.
    * @prop config.options: Options for Leaflet Control
    */
    'config': { autoAdd: boolean; options: {}; };
    'getControl': () => Promise<any>;
    /**
    * Leaflet map instance where control will be registered
    */
    'language': string;
    /**
    * Leaflet map instance where control will be registered
    */
    'map': L.Map;
  }
}

declare global {


  interface HTMLPwcLeafletEntitySelectorElement extends Components.PwcLeafletEntitySelector, HTMLStencilElement {}
  var HTMLPwcLeafletEntitySelectorElement: {
    prototype: HTMLPwcLeafletEntitySelectorElement;
    new (): HTMLPwcLeafletEntitySelectorElement;
  };
  interface HTMLElementTagNameMap {
    'pwc-leaflet-entity-selector': HTMLPwcLeafletEntitySelectorElement;
  }
}

declare namespace LocalJSX {
  interface PwcLeafletEntitySelector {
    /**
    * Extended leaflet configuration for pwc-leaflet-entity-selector
    * @prop config.autoAdd: If enabled, auto add control to given map instance.
    * @prop config.options: Options for Leaflet Control
    */
    'config'?: { autoAdd: boolean; options: {}; };
    /**
    * Leaflet map instance where control will be registered
    */
    'language'?: string;
    /**
    * Leaflet map instance where control will be registered
    */
    'map'?: L.Map;
    /**
    * Leaflet map instance where control will be registered
    */
    'onControlEvents'?: (event: CustomEvent<ControlEvent>) => void;
  }

  interface IntrinsicElements {
    'pwc-leaflet-entity-selector': PwcLeafletEntitySelector;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pwc-leaflet-entity-selector': LocalJSX.PwcLeafletEntitySelector & JSXBase.HTMLAttributes<HTMLPwcLeafletEntitySelectorElement>;
    }
  }
}


