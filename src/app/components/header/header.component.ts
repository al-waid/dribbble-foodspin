import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('appNav', {static: true}) navElm: ElementRef;
  constructor() { }

  ngOnInit(): void {
    
  }

  toggleMenu() {
    this.navElm.nativeElement.classList.toggle('opned');
  }
}
