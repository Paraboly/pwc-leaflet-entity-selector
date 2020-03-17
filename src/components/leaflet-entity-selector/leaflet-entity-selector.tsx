declare var L;

import { Component, Host, h, Prop, EventEmitter, Event, Method, State } from '@stencil/core';
import { MAIN_STATES, CONTROL_STATES } from './states';
import TRANSLATIONS from './translations';

@Component({
  tag: 'pwc-leaflet-entity-selector',
  styleUrl: 'leaflet-entity-selector.scss',
  shadow: true
})
export class LeafletEntitySelector {
  @State() controlState: string;
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
  @Prop() config = {
    autoAdd: true,
    leaflet: L.ControlOptions = {}
  };

  @Event({ eventName: "pwcLeafletEntitySelector" }) eventEmitter: EventEmitter;

  @Method()
  async getControl() {
    return this.control;
  }

  componentWillLoad() {
    this.controlState = MAIN_STATES.INITIAL
    this.control = this._createControlBtn(this._onControlBtnTriggered.bind(this));

    /**
     * If map is provided and auto-add feature is enabled,
     * control will be added to map and controlAdded event will be emitted.
     */
    if (this.map && this.config.autoAdd) {
      this.map.addControl(this.control);

      this.eventEmitter.emit({ state: CONTROL_STATES.BTN_CONTROL_ADDED, control: this.control });
    } else if (!this.map && this.config.autoAdd) {
      // tslint:disable-next-line: no-console
      console.warn("map prop is not valid, set leaflet map instance to map prop.")
    }
  }

  _createControlBtn(onClickCb) {
    return L.easyButton('fa-object-ungroup', onClickCb, 'Taranacak alanı seçin');
  }

  _onControlBtnTriggered() {
    if (this.controlState === MAIN_STATES.INITIAL)
      this.controlState = MAIN_STATES.SELECT_START;
  }

  _renderHelperText() {
    return this.controlState !== MAIN_STATES.INITIAL && <div class="helper">
      <p>ℹ️ {TRANSLATIONS[navigator.language !== "tr-TR" ? "en-US" : "tr-TR"]["helper-texts"].SELECT_START}</p>
    </div>
  }

  render() {
    return (
      <Host class="leaflet-control m-5 p-2 rounded-sm bg-white" style={this.controlState === MAIN_STATES.INITIAL ? { 'display': 'none' } : {}}>
        {this._renderHelperText()}
        <slot></slot>
      </Host>
    );
  }

}
