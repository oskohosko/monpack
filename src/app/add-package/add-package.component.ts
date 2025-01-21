import { Component } from '@angular/core';
import { Data, Router, RouterModule } from '@angular/router';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {

  allDrivers: Driver[] = [];

  package: Package = new Package();

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  // Populating allDrivers.
  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      this.allDrivers = data;
    })
  }

  addPackage() {
    this.db.addPackage(this.package).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(["list-packages"]);
    })
  }
}
