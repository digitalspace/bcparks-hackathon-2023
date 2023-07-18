import { ParkConstants } from '../constants/park-constants';
import * as jsts from 'jsts';

export class GeoUtils {
  public createPolygonFromGeoJSON(orcsId) {
    const parks = ParkConstants.parks;
    // filter park
    const park: any = parks.filter((park) => park.orcs === orcsId);
    // get coord poly
    const coords = park[0].geoJson?.geometry?.coordinates;
    // generate flattened array of polys
    let arrList = [];
    for (const feature of coords) {
      let subList = [];
      this.getNestedArray(feature, subList);
      arrList.push(subList);
    }
    return this.createGooglePoly(arrList);
  }

  /**
   * Checks if a point defined by the given longitude and latitude intersects with a polygon.
   * @param {number} lng - The longitude of the point.
   * @param {number} lat - The latitude of the point.
   * @param {any} poly - The polygon to check against
   * @returns {number} - The number of intersection points between the point and the polygon.
   */
  public checkIfLatLngIntersects(lng: Number, lat: Number, poly: any) {
    if (!poly) {
      return;
    } else {
    }

    // Build the geojson for mainPolygon
    const routeFeature = {
      type: 'Feature',
      properties: { Id: 0 },
      geometry: {
        type: 'Polygon',
        coordinates: [[]],
      },
    };

    // Convert array of object routePolygons to array of pairs
    for (const obj of poly) {
      routeFeature.geometry.coordinates[0].push([obj.lng, obj.lat]);
    }

    let polyGeoJSON = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    const geojsonReader = new jsts.io.GeoJSONReader();
    const pointJSTS = geojsonReader.read(polyGeoJSON);
    const wormJSTS = geojsonReader.read(routeFeature.geometry);
    let intersected = wormJSTS.intersection(pointJSTS);

    return intersected.getNumPoints();
  }

  createGooglePoly(polygon) {
    let polyList = [];
    for (const poly of polygon) {
      let item: google.maps.LatLngLiteral[] = [];
      for (const coord of poly) {
        item.push({ lat: coord[1], lng: coord[0] });
      }
      polyList.push(item);
    }
    return polyList;
  }

  private getNestedArray(arr, arrList) {
    if (arr[0]?.length) {
      for (const subArr of arr) {
        this.getNestedArray(subArr, arrList);
      }
    } else {
      arrList.push(arr);
    }
  }

  public createJSTSPoly(coordArray) {
    let geoFactory = new jsts.geom.GeometryFactory();
    let polygon = geoFactory.createPolygon(
      this.createJSTSCoordArray(this.ensureClosedPolygon(coordArray))
    );
    return polygon;
  }

  private ensureClosedPolygon(coordArray) {
    let lastElem = coordArray[coordArray.length - 1];
    if (coordArray[0] !== lastElem) {
      coordArray.push(coordArray[0]);
    }
    return coordArray;
  }

  public mergePolyons(poly1, poly2) {
    let geoFactory = new jsts.geom.GeometryFactory();
    let union = poly1.union(poly2);
  }

  private createJSTSCoordArray(coordArray) {
    let coordinates: any[] = [];
    for (const coord of coordArray) {
      coordinates.push(
        new jsts.geom.Coordinate(
          coord.lat, // lat
          coord.lng // lng
        )
      );
    }
    return coordinates;
  }

  public decodePath(encodedPath) {
    let path: google.maps.LatLngLiteral[] = [];
    for (const point of encodedPath) {
      path.push({
        lat: point.lat(),
        lng: point.lng(),
      });
    }
    return path;
  }

  public googleMaps2JTS(boundaries) {
    var coordinates: any[] = [];
    var length = 0;
    if (boundaries && boundaries.getLength) length = boundaries.getLength();
    else if (boundaries && boundaries.length) length = boundaries.length;
    for (var i = 0; i < length; i++) {
      if (boundaries.getLength)
        coordinates.push(
          new jsts.geom.Coordinate(
            boundaries.getAt(i).lat(),
            boundaries.getAt(i).lng()
          )
        );
      else if (boundaries.length)
        coordinates.push(
          new jsts.geom.Coordinate(boundaries[i].lat(), boundaries[i].lng())
        );
    }
    return coordinates;
  }

  public jsts2googleMaps = function (geometry) {
    let coordArray = geometry.getCoordinates();
    let GMcoords: any[] = [];
    for (const item of coordArray) {
      GMcoords.push(new google.maps.LatLng(item.x, item.y));
    }
    return GMcoords;
  };
}
