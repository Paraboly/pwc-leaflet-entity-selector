declare var L;
declare var turf;

function createControlBtn(onClickCb) {
  return L.easyButton("fa-object-ungroup", onClickCb, "Taranacak alanı seçin");
}

/**
 * @param {L.Map} map
 * @param {GeoJSON} area which will be used as bounding box
 * @returns list of features inside given area
 */
function featureWithinBoundingBox(map: L.Map, area: any) {
  if (!map || !area) return;

  const withinFeatures = [];

  map.eachLayer((layer: any) => {
    if (typeof layer.toGeoJSON === 'function') {
      const geometry = layer.toGeoJSON();
      let within;
      try {
        // TODO: Currently support only feature not FeatureCollection.
        if (geometry && geometry.type !== "FeatureCollection")
          within = turf.booleanWithin(geometry, area);
      } finally {
        if (within) withinFeatures.push(geometry);
      }
    }
  })

  return withinFeatures;
}

const UTILS = {
  createControlBtn,
  featureWithinBoundingBox
};

export default UTILS;
