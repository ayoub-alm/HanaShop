import { Component, OnInit } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";

/**
 * Header Section Component
 * Enhanced hero section with modern design and animations
 */
@Component({
  selector: 'app-header-section',
  standalone: true,
  templateUrl: './header-section.component.html',
  imports: [
    MatButton,
    MatIconButton,
    RouterLink,
    MatIcon,
    MatCard
  ],
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {
  ngOnInit(): void {
    // AOS animations removed
  }
}
