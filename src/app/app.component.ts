import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParticleBackgroundComponent } from './shared/components/particle-background/particle-background.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ParticleBackgroundComponent,
    CustomCursorComponent,
    NavbarComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Inject theme service to ensure theme is initialized immediately
  readonly themeService = inject(ThemeService);
}

export { AppComponent as App };
