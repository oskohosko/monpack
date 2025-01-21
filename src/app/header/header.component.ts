import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    this.loggedIn = this.auth.isLoggedIn();
  }

  logOut() {
    this.auth.logOut();
    this.loggedIn = false
    this.router.navigate(["signin"]);
  }
}
