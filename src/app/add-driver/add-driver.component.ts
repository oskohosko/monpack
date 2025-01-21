import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from "../models/driver";
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})

export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  // ngOnInit() {
  //   if (!this.auth.isLoggedIn()) {
  //     this.router.navigate(["signin"])
  //   }
  // }

  addDriver() {
    this.db.addDriver(this.driver).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(["list-drivers"]);
    })
  }
}
