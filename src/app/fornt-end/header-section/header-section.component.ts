import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-section',
  standalone: true,
  templateUrl: './header-section.component.html',
  imports: [
    MatButton,
    RouterLink
  ],
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent {

}
