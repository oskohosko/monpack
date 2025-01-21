import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  allDrivers: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit(){
    this.db.getDrivers().subscribe((data:any) => {
      this.allDrivers = data;
    })
  }

  // Variables of things we will update
  driverId: string = '';
  newLicence: string = '';
  newDep: string = '';

  updateDriver() {

    this.db.updateDriver(this.driverId, this.newLicence, this.newDep).subscribe(
      (response) => {
        console.log(response)
        // Driver updated successfully
        this.router.navigate(["list-drivers"])
      },
      (error) => {
        console.error(error)
      }
    )
  }
}
