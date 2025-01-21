import { Component } from '@angular/core';
import { Package } from '../models/package';
import { io } from 'socket.io-client';
import { DatabaseService } from '../database.service';
import { GramsPipe } from '../grams.pipe';
import { DriveridPipe } from '../driverid.pipe';

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [GramsPipe, DriveridPipe],
  templateUrl: './gen-ai.component.html',
  styleUrl: './gen-ai.component.css'
})
export class GenAiComponent {
  socket: any = null

  allPackages: Package[] = [];

  distance: string = '';

  constructor(private db: DatabaseService) {
    this.socket = io("ws://localhost:8080")
  }

  ngOnInit() {
    this.db.getPackages().subscribe((data: any) => {
      this.allPackages = data;
    })

    this.socket.on("distanceResult", (result: string) => {
      this.distance = result;
    })
  }


  getDistance(idx: number) {
    const destination = this.allPackages[idx].package_destination;

    this.socket.emit("getDistance", destination);
  }

}
