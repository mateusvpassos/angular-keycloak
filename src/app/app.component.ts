import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  helloText = '';

  constructor(private oAuthService: OAuthService, private httpClient: HttpClient) {
  }

  logout() {
    const idToken = this.oAuthService.getIdToken();
    const logoutOptions = {
      id_token_hint: idToken,
      post_logout_redirect_uri: window.location.origin,
      client_id: 'login-app'
    };
    this.oAuthService.logOut(logoutOptions);
  }

  getHelloAdmin() {
    const accessToken = this.oAuthService.getAccessToken();
    console.log('Access Token:', accessToken);
  
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello-admin', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).subscribe(
      result => {
        console.log('Hello Admin Result:', result);
        this.helloText = result.message;
      },
      error => {
        console.error('Error fetching hello-admin:', error);
      }
    );
  }
  
  getHelloUser() {
    const accessToken = this.oAuthService.getAccessToken();
    console.log('Access Token:', accessToken);
  
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello-user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).subscribe(
      result => {
        console.log('Hello User Result:', result);
        this.helloText = result.message;
      },
      error => {
        console.error('Error fetching hello-user:', error);
      }
    );
  }
  
}
