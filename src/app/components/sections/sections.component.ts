import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { SectionListComponent } from './section-list/section-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  constructor(private sidebarService: SidebarService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let subchapters = this.route.snapshot.data.subchapters;
    let sections = this.route.snapshot.data.sections;
    subchapters.map(subchapter => {
      subchapter.sections = sections.filter(section => section.subchapterId === subchapter.id);
    });
    console.log(subchapters);
    this.sidebarService.loadComponent({ component: SectionListComponent, data: subchapters });
  }

}
