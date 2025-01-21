import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// URL used for authentication
const URL = "http://localhost:8080/31450628/Oskar/api/v1/auth";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variable to store user login status
  // private isAuthenticated: boolean = true;

  constructor(private http: HttpClient) { }

  logIn(username: string, password: string) {
    const userObj = {
      "username": username,
      "password": password
    };
    // Sending username and password as JSON object to the backend and checking response.
    return this.http.post(URL + "/login", userObj, httpOptions).pipe(
      tap((response: any) => {
        // If response is logged in, we set our variable to true
        if (response.status === "Logged In Successfully") {
          localStorage.setItem("loggedIn", "true");
          // this.isAuthenticated = true;
        }
      })
    )
  }

  signUp(username: string, password1: string, password2: string) {
    const newUserObj = {
      "username": username,
      "password": password1,
      "confirm": password2
    };

    return this.http.post(URL + "/signup", newUserObj, httpOptions);
  }

  isLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      console.log(localStorage)
      if (localStorage.getItem("loggedIn") === "true") {
        console.log(true)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  logOut() {
    localStorage.setItem("loggedIn", "false")
  }
}
