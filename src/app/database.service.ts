import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// API URL
const API_URL = "http://localhost:8080/31450628/Oskar/api/v1"

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  // This is where we add our functionality.

  // Beginning with drivers

  // Get Drivers
  getDrivers() {
    return this.http.get(API_URL + "/drivers");
  };

  // Add Driver
  addDriver(driver: any) {
    return this.http.post(API_URL + "/drivers/add", driver, httpOptions);
  };

  // Delete Driver
  deleteDriver(id: string) {
    console.log("here")
    return this.http.delete(API_URL + `/drivers/delete?id=${id}`, httpOptions);
  };

  // Update Driver
  updateDriver(id: string, licence: string, department: string) {
    const updateObj = {
      "id": id,
      "driver_licence": licence,
      "driver_department": department
    };
    return this.http.put(API_URL + "/drivers/update", updateObj, httpOptions);
  };

  // Gets one driver
  getDriver(driver_id: string) {
    return this.http.get(API_URL + `/drivers/get?driver_id=${driver_id}`, httpOptions)
  }

  // And now packages

  // Get Packages
  getPackages() {
    return this.http.get(API_URL + "/packages");
  };

  // Add Package
  addPackage(pack: any) {
    return this.http.post(API_URL + "/packages/add", pack, httpOptions);
  };

  // Delete Package
  deletePackage(id: string) {
    return this.http.delete(API_URL + `/packages/delete?id=${id}`, httpOptions);
  };

  // Update Package
  updatePackage(id: string, destination: string) {
    const packObj = {
      "package_id": id,
      "package_destination": destination
    };
    return this.http.put(API_URL + "/packages/update", packObj, httpOptions);
  };

  // Firebase stuff
  getStats() {
    return this.http.get("http://localhost:8080/31450628/Oskar/stats")
  }

  resetStats() {
    return this.http.post("http://localhost:8080/reset-stats", httpOptions)
  }

}
