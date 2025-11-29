import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Login } from './components/login/login';

import { SharedModule } from './shared/shared-module'; // Used for shared components, pipes, directives, etc.
import { CoreModule } from './core/core-module'; // Used for singleton services, guards, interceptors, etc.

import { MainLayout } from './layout/main-layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [SharedModule, MainLayout, CoreModule,Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private http: HttpClient) {}

  protected readonly title = signal('Ecom.Client');



  KeyUpHandler(event : KeyboardEvent)
  {
    console.log(`user PRessed the ${event.key} Key`)
  }

}
