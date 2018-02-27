import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit, OnDestroy, EmbeddedViewRef } from '@angular/core';
import { SidebarDirective } from './sidebar.directive';
import { SidebarService } from '../sidebar/sidebar.service';
import { Subscription } from 'rxjs/Subscription';
import { ChapterListComponent } from '../../components/chapters/chapter-list/chapter-list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(SidebarDirective) sidebarHost: SidebarDirective;
  sidebarSub: Subscription;
  previousComponent;
  constructor(
    private sidebarService: SidebarService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.sidebarSub = this.sidebarService.Sidebar$.subscribe(component => {
      this.loadComponent(component);
    });
  }
  loadComponent(component) {
    this.removePrevious();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.sidebarHost.viewContainerRef;
    this.previousComponent = viewContainerRef.createComponent(componentFactory);
  }
  ngOnDestroy() {
    console.log('sidebar destroy');
    this.sidebarSub.unsubscribe();
  }
  private removePrevious() {
    if (this.previousComponent) {
      this.sidebarHost.viewContainerRef.clear();
    }
  }
}
