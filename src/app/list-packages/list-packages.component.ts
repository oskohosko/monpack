import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { GramsPipe } from '../grams.pipe';
import { DriveridPipe } from '../driverid.pipe';
import { Package } from '../models/package';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';
import { UpperCasePipe } from '../upper-case.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [GramsPipe, DriveridPipe, UpperCasePipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  allPackages: Package[] = []

  assignedDriver: any;

  // Flag to show the driver details or not
  showingDriver: boolean = false;

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.db.getPackages().subscribe((data: any) => {
      console.log(data);
      this.allPackages = data;
    })
  }

  viewDriver(idx: number) {
    // Toggling
    this.showingDriver = !this.showingDriver

    if (this.showingDriver) {
      // Getting the driver reference and assigning to our assigned driver
      this.assignedDriver = this.allPackages[idx].driver_id;
    }
  }
}
