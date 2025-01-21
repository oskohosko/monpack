import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { GramsPipe } from '../grams.pipe';
import { DriveridPipe } from '../driverid.pipe';
import { Package } from '../models/package';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [GramsPipe, DriveridPipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  allPackages: Package[] = []

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.db.getPackages().subscribe((data: any) => {
      console.log(data);
      this.allPackages = data;
    })

  }

  // Handling the delete button
  deletePackage(index: number) {
    // We have to firstly get the driver_id and then our backend controller handles the MongoDB stuff
    this.db.deletePackage(this.allPackages[index]._id).subscribe(
      (response) => {
        console.log('Package deleted successfully', response);
        // Redirecting to list packages
        this.router.navigate(['list-packages']);
      },
      (error) => {
        console.error('Error deleting package', error);
      }
    );
  }
}
