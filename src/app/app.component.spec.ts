import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeService } from './core/services/theme.service';
import { PERSONAL_DATA } from './data/portfolio-data';
import { ContactComponent } from './components/sections/contact/contact.component';

describe('Abdelrahman Elstohy Portfolio App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ContactComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have personal data configured for Abdelrahman Elstohy', () => {
    expect(PERSONAL_DATA.name).toBe('Abdelrahman Elstohy');
    expect(PERSONAL_DATA.university).toBe('Mansoura University');
    expect(PERSONAL_DATA.roleTitles).toContain('Backend Developer');
    expect(PERSONAL_DATA.roleTitles).toContain('Software Engineer');
    expect(PERSONAL_DATA.roleTitles).toContain('Full-Stack Developer');
  });

  it('should initialize theme service with dark mode as default', () => {
    const themeService = TestBed.inject(ThemeService);
    expect(themeService.currentTheme()).toBe('dark');
    expect(themeService.isDark()).toBe(true);

    // Test toggle
    themeService.toggleTheme();
    expect(themeService.currentTheme()).toBe('light');
    expect(themeService.isDark()).toBe(false);

    // Toggle back to default dark
    themeService.toggleTheme();
    expect(themeService.currentTheme()).toBe('dark');
  });

  it('should start the app and allow theme changes when browser storage is blocked', () => {
    const storage = vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage blocked', 'SecurityError');
    });

    try {
      const fixture = TestBed.createComponent(AppComponent);
      const themeService = fixture.componentInstance.themeService;
      expect(themeService.currentTheme()).toBe('dark');
      expect(document.body.classList.contains('theme-dark')).toBe(true);

      themeService.toggleTheme();
      expect(themeService.currentTheme()).toBe('light');
      expect(document.body.classList.contains('theme-light')).toBe(true);
    } finally {
      storage.mockRestore();
    }
  });

  it('should validate contact form fields accurately', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    const form = component.contactForm;

    expect(form.valid).toBe(false);

    // Set invalid email
    form.patchValue({
      fullName: 'Abdelrahman',
      email: 'not-an-email',
      subject: 'Collaboration',
      message: 'This is a message with more than 15 chars',
    });
    expect(form.get('email')?.valid).toBe(false);
    expect(form.valid).toBe(false);

    // Set valid email
    form.patchValue({
      email: 'engineer@example.com',
    });
    expect(form.get('email')?.valid).toBe(true);
    expect(form.valid).toBe(true);
  });
});
