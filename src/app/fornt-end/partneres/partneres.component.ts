import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-partneres',
  standalone:true,
  imports: [MatIcon, MatIconModule, MatCard, MatCardHeader, MatCardContent, MatCardImage, MatCardActions, MatButton, MatCardModule],
  templateUrl: './partneres.component.html',
  styleUrls: ['./partneres.component.css']
})
export class PartneresComponent implements OnInit{
  ngOnInit(): void {
    // AOS.init();
  }


}
