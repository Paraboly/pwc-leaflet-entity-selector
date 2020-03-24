declare var L;

import { Component, Host, h, Element, Prop, EventEmitter, Event, Method, State } from '@stencil/core';
import { STATES, EVENTS, ControlEvent } from './constant';
import UTILS from '../../utils/utils';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'pwc-leaflet-entity-selector',
  styleUrl: 'leaflet-entity-selector.scss',
  shadow: true
})
export class LeafletEntitySelector {
  @Element() element: HTMLElement;
  /**
   *  Current state of the control
   */
  @State() state: STATES;
  /**
   *  Translations for the control
   */
  translations: any;
  /**
   *  Selected area by user
   */
  polygon: L.Polygon;
  /**
   *  Leaflet control instance wrapped by stencilJS
   */
  control: L.Control;
  /**
   * Leaflet map instance where control will be registered
   */
  @Prop() map: L.Map;
  /**
   * Extended leaflet configuration for pwc-leaflet-entity-selector
   *  @prop config.autoAdd: If enabled, auto add control to given map instance.
   *  @prop config.options: Options for Leaflet Control
   */
  @Prop() config = {
    autoAdd: true,
    options: L.ControlOptions = {}
  };

  /**
   * Leaflet map instance where control will be registered
   */
  @Event() controlEvents: EventEmitter<ControlEvent>;

  @Method()
  async getControl(): Promise<any> {
    return this.control;
  }

  async componentWillLoad(): Promise<void> {
    this.translations = await getLocaleComponentStrings(this.element);

    if (this.map && this.map instanceof L.Map) {
      this.map.on('editable:drawing:end', this.onSelectCompleted.bind(this));
      this.map.on('editable:drawing:cancel', this.onCancel.bind(this));
      this._registerControlBtn();
      this.initialize();
    } else if (!this.map) {
      // tslint:disable-next-line: no-console
      console.warn("map prop is not valid, set leaflet map instance to map prop.")
    }
  }

  initialize() {
    this.state = STATES.INITIAL;

    if (this.polygon) {
      this.map.removeLayer(this.polygon);
      this.polygon = null;
    }
  }

  onSelectStart() {
    if (this.state !== STATES.INITIAL) return;

    this.state = STATES.SELECT_START;
    this.polygon = this.map['editTools'].startPolygon();
  }

  onSelectCompleted() {
    if (this.state === STATES.SELECT_START)
      this.state = STATES.SELECT_COMPLETED;
  }

  onCancel() {
    this.controlEvents.emit({ event: EVENTS.SELECT_CANCELED });
    this.initialize();
  }

  onEditCompleted() {
    const area = this.polygon.toGeoJSON();

    const features = UTILS.featureWithinBoundingBox(this.map, area);

    this.controlEvents.emit({ event: EVENTS.CONTROL_ADDED, area, features });

    this.state = STATES.EDIT_COMPLETED;
    this.initialize();
  }

  _renderHelperText() {
    return this.state !== STATES.INITIAL && <div class="helper">
      <p>ℹ️ {this.translations[`helper-texts.${this.state}`]}</p>
    </div>
  }

  _renderBtn() {
    return <div class="btn-container" style={{ textAlign: "right" }}>
      {this.state !== STATES.INITIAL && <input type="button" class="btn" value={this.translations["helper-btn.cancel"]} onClick={this.onCancel.bind(this)}></input>}
      {this.state === STATES.SELECT_COMPLETED && <input type="button" class="btn m-l" value={this.translations["helper-btn.complete"]} onClick={this.onEditCompleted.bind(this)}></input>}
    </div>
  }

  _registerControlBtn() {
    if (!this.control) {
      this.control = UTILS.createControlBtn(this.onSelectStart.bind(this)).addTo(this.map);
      this.controlEvents.emit({ event: EVENTS.CONTROL_ADDED });
    }
  }

  render() {
    return (
      <Host class="leaflet-control m-5 p-2 rounded-sm bg-white" style={this.state === STATES.INITIAL ? { 'display': 'none' } : {}}>
        {this.state}
        {this._renderHelperText()}
        {this._renderBtn()}
        <slot></slot>
      </Host>
    );
  }

}
