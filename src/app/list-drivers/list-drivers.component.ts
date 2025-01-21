import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { UpperCasePipe } from '../upper-case.pipe';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GramsPipe } from '../grams.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, GramsPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {

  allDrivers: Driver[] = [];

  // Triggers our packages table if true
  viewingPackages: boolean = false;

  driverPackages: Package[] = [];

  constructor(private db: DatabaseService, private auth: AuthService, private router: Router) {}

  ngOnInit(){
    // Getting all drivers
    this.db.getDrivers().subscribe((data:any) => {
      this.allDrivers = data;
    })
  }

  viewPackages(idx: number) {
    // Toggling viewing packages boolean
    this.viewingPackages = !this.viewingPackages;

    // Getting the selected driver
    let selectedDriver = this.allDrivers[idx];

    // Now if we are viewing packages, let's get each drivers' packages
    if (this.viewingPackages) {
      // And getting their assigned packages
      this.driverPackages = selectedDriver.assigned_packages;
      // And just mapping each driver_id to the selected one's because it wasn't working for some reason.
      this.driverPackages = this.driverPackages.map(pack => {
        pack.driver_id = selectedDriver.driver_id
        return pack;
      })
    }
  }
}
