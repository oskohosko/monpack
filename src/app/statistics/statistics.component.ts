import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  stats: any = {};

  allDrivers: Driver[] = [];

  allPackages: Package[] = [];

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    // Getting stats
    this.db.getStats().subscribe((data: any) => {
      console.log(data);
      this.stats = data;
    });

    // Getting drivers
    this.db.getDrivers().subscribe((data: any) => {
      this.allDrivers = data;
    })

    // Getting packages
    this.db.getPackages().subscribe((data: any) => {
      this.allPackages = data;
    })
  };

  resetStats() {
    this.db.resetStats().subscribe((data: any) => {
      console.log(data)
      this.stats = data;
    });
  }
}
