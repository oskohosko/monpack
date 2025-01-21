import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private auth: AuthService, private router: Router) {}

  // Existing user object to login user
  existingUserObj = {
    "username": '',
    "password": ''
  }

  // Method that handles logging in a user
  logIn() {
    const user = this.existingUserObj.username;
    const pass = this.existingUserObj.password;
    // When we login, we want to redirect to the homepage.
    this.auth.logIn(user, pass).subscribe(
      (response: any) => {
        console.log('Logged in successfully', response);
        // Redirecting to dashboard upon login.
        // window.location.reload();
        this.router.navigate(["dashboard"]);
      },
      (error) => {
        console.error(error)
        this.router.navigate(["invalid-data"])
      }
    )
  }

  // Empty object to begin with.
  newUserObj = {
    "username": '',
    "password1": '',
    "password2": ''
  }
  // Method that signs up the user
  signUp() {
    // Sign up, we want to alert the user that it was successful
    const user = this.newUserObj.username;
    const pass = this.newUserObj.password1;
    const conf = this.newUserObj.password2;

    // Signing up the user
    this.auth.signUp(user, pass, conf).subscribe(
      (response: any) => {
        console.log("Signed up successfully", response);
      },
      (error) => {
        console.error(error)
        this.router.navigate(["invalid-data"])
      }
    )
  }
}
