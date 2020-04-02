# pwc-leaflet-entity-selector



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                    | Type                                 | Default                                                       |
| ---------- | ---------- | -------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `config`   | --         | Extended leaflet configuration for pwc-leaflet-entity-selector | `{ autoAdd: boolean; options: {}; }` | `{     autoAdd: true,     options: L.ControlOptions = {}   }` |
| `language` | `language` | Leaflet map instance where control will be registered          | `string`                             | `"en"`                                                        |
| `map`      | `map`      | Leaflet map instance where control will be registered          | `any`                                | `undefined`                                                   |


## Events

| Event           | Description                                           | Type                        |
| --------------- | ----------------------------------------------------- | --------------------------- |
| `controlEvents` | Leaflet map instance where control will be registered | `CustomEvent<ControlEvent>` |


## Methods

### `getControl() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `registerControl(map?: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
