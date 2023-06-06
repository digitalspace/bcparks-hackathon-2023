import { GeoUtils } from './geoUtils';

export class DataUtils {
  public processData(mainPolygon, limitSearchBoundary, data, createMarkerObjectFunction, dataId, markerOptions, label) {
    let markerPositions = [];

    if (mainPolygon && limitSearchBoundary) {
      // Do fetches with limiter
      data = this.getFilteredData(mainPolygon, data);
    }
    markerPositions = this.addMarkers(data, createMarkerObjectFunction);

    return {
      id: dataId,
      data: data,
      markerPositions: markerPositions,
      markerOptions: markerOptions,
      label: label,
    };
  }

  // Requires a route poly and data[x].lat as well as data[x].lng
  getFilteredData(poly, data) {
    let filteredData = [];
    for (const item of data) {
      const lat = item.lat;
      const lng = item.lng;
      const geoUtils = new GeoUtils();
      if (geoUtils.checkIfLatLngIntersects(lng, lat, poly)) {
        filteredData.push(item);
      }
    }

    return filteredData;
  }

  // Marker object must contain lat, lng, infoWindow
  addMarkers(cordsArray, createMarkerObjectFunction) {
    if (!cordsArray || cordsArray.length === 0) return [];
    let markerPositions = [];
    cordsArray.forEach((element) => {
      markerPositions.push(createMarkerObjectFunction(element));
    });
    return markerPositions;
  }
}
