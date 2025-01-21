import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { UpperCasePipe } from '../upper-case.pipe';
import { DatabaseService } from '../database.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [UpperCasePipe, RouterModule, FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  // Lists all drivers
  allDrivers: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit(){
    this.db.getDrivers().subscribe((data:any) => {
      this.allDrivers = data;
      })
  };

  // Handling the delete button
  deleteDriver(index: number) {
    // We have to firstly get the driver_id and then our backend controller handles the MongoDB stuff
    this.db.deleteDriver(this.allDrivers[index]._id).subscribe(
      (response) => {
        console.log('Driver deleted successfully', response);
        // Redirecting to list drivers
        this.router.navigate(['list-drivers']);
      },
      (error) => {
        console.error('Error deleting driver', error);
      }
    );
  }
}
