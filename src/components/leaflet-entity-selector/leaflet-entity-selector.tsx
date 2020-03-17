import * as L from 'leaflet';
import { Component, Host, h, Prop, EventEmitter, Event, Method } from '@stencil/core';

@Component({
  tag: 'pwc-leaflet-entity-selector',
  styleUrl: 'leaflet-entity-selector.css',
  shadow: true
})
export class LeafletEntitySelector {
  private control: L.Control;
  /**
   * If leaflet map instance provided, auto-add feature will be enabled.
   */
  @Prop() map?: L.Map;
  /**
   * Extended leaflet configuration for pwc-leaflet-entity-selector
   *  @prop config.autoAdd: If enabled, auto add control to given map instance. Map should be provided to activate this feature.
   *  @prop config.leaflet: Default options for leaflet control
   */
  @Prop() config?: {
    autoAdd: false,
    leaflet: L.ControlOptions
  };

  @Event() controlAdded: EventEmitter;

  @Method()
  async getControl() {
    return this.control;
  }

  ComponentDidLoad() {
    this.control = new L.Control(this.config.leaflet);

    /**
     * If map is provided and auto-add feature is enabled,
     * control will be added to map and controlAdded event will be emitted.
     */
    if (this.map && this.config.autoAdd) {
      this.map.addControl(this.control);
      this.controlAdded.emit(this.controlAdded);
    } else if (!this.map && this.config.autoAdd) {
      // tslint:disable-next-line: no-console
      console.warn("map prop is not valid, set leaflet map instance to map prop.")
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
