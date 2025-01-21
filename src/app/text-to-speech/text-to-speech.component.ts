import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { UpperCasePipe } from '../upper-case.pipe';

import { io } from 'socket.io-client';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent {

  socket: any = null;
  allDrivers: Driver[] = [];

  constructor(private db: DatabaseService) {
    this.socket = io('ws://localhost:8080');
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      console.log(data)
      this.allDrivers = data;
    })

    this.socket.on("getSpeech", (data: ArrayBuffer) => {
      this.downloadFile(data, "downloaded.mp3")
    })
  }

  textToSpeech(idx: number) {
    const licence = this.allDrivers[idx].driver_licence;

    this.socket.emit("toSpeech", licence)
  }

  downloadFile(data: ArrayBuffer, filename: string) {
    const blob = new Blob([data], { type: 'audio/mpeg' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
