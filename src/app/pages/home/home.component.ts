import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/sections/hero/hero.component';
import { AboutComponent } from '../../components/sections/about/about.component';
import { EducationComponent } from '../../components/sections/education/education.component';
import { ExperienceComponent } from '../../components/sections/experience/experience.component';
import { SkillsComponent } from '../../components/sections/skills/skills.component';
import { ProjectsComponent } from '../../components/sections/projects/projects.component';
import { ServicesComponent } from '../../components/sections/services/services.component';
import { ContactComponent } from '../../components/sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
  ],
  template: `
    <main class="main-content">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-education></app-education>
      <app-experience></app-experience>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-services></app-services>
      <app-contact></app-contact>
    </main>
  `,
  styles: [
    `
      .main-content {
        position: relative;
        z-index: 1;
        width: 100%;
        overflow-x: hidden;
      }
    `,
  ],
})
export class HomeComponent {}
