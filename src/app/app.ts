import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

import { SharedModule } from './shared/shared-module'; // Used for shared components, pipes, directives, etc.
import { CoreModule } from './core/core-module'; // Used for singleton services, guards, interceptors, etc.

import { MainLayout } from './layout/main-layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [SharedModule, MainLayout, CoreModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private http: HttpClient) {}

  protected readonly title = signal('Ecom.Client');



}
