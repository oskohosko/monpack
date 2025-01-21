import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';
import { GramsPipe } from '../grams.pipe';
import { DriveridPipe } from '../driverid.pipe';
import { io } from "socket.io-client";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [GramsPipe, DriveridPipe, FormsModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {

  socket: any = null;

  allPackages: Package[] = [];

  language: string = '';

  translatedText: string = '';

  constructor(private db: DatabaseService) {
    this.socket = io('ws://localhost:8080');
  }

  ngOnInit() {
    // Getting packages
    this.db.getPackages().subscribe((data: any) => {
      this.allPackages = data
    })
    // Checking for socket
    this.socket.on("getTranslation", (translation: any) => {
      console.log(4)
      console.log(translation)
      this.translatedText = translation.translatedText;
    })
  }

  translate(idx: number) {
    // Getting the description of the selected package
    const text = this.allPackages[idx].description;
    console.log(1);
    console.log(text, this.language);
    // And sending to backend
    this.socket.emit("translateText", [text, this.language]);
  }

}
