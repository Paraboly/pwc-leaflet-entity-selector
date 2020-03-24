export interface ControlEvent {
  event: EVENTS;
  area?: any; // Geojson
  features?: any;
  geojson?: L.GeoJSON;
}

/**
 * Control States
 */
enum STATES {
  INITIAL = "INITIAL",
  SELECT_START = "SELECT_START",
  SELECT_COMPLETED = "SELECT_COMPLETED",
  EDIT_COMPLETED = "EDIT_COMPLETED"
}

/**
 * Control Events
 */
enum EVENTS {
  CONTROL_ADDED = "CONTROL_ADDED",
  SELECT_CANCELED = "SELECT_CANCELED",
  SELECT_START = "SELECT_START",
  SELECT_COMPLETED = "SELECT_COMPLETED",
  EDIT_COMPLETED = "EDIT_COMPLETED"
}

export { STATES, EVENTS };
