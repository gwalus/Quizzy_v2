import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.toastr.success('Login successfully');

    }, error => {
      this.toastr.error(error.error);
    })
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Logged out');
  }
}
