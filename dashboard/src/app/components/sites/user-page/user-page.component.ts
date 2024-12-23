import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../../icon/icon.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  accountData: any;

  ngOnInit(): void {
    this.accountData = this.authService.getUserData()
    console.log(this.accountData)
  }
}
