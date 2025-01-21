import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {

  allPackages: Package[] = [];

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit(){
    this.db.getPackages().subscribe((data:any) => {
      this.allPackages = data;
    })
  }

  // Variables of things we will update
  packageId: string = '';
  newDestination: string = '';

  updatePackage() {

    this.db.updatePackage(this.packageId, this.newDestination).subscribe(
      (response) => {
        console.log(response)
        // Package updated successfully
        this.router.navigate(["list-packages"])
      },
      (error) => {
        console.error(error)
      }
    )
  }

}
