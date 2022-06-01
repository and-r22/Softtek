import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from 'src/app/_modulo/menu';
import { MenuService } from 'src/app/_services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private router: Router) { }

  ngOnInit(): void {

    this.menuService.getMenuCambio().subscribe(
      x => this.menus = x
    );
  }

  navegar(url: string) {
    this.router.navigate([url]);
  }

}
