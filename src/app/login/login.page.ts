import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
  IonSpinner,
  IonText,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonButton,
    IonLabel,
    IonInput,
    IonSpinner,
    IonText,
    IonCheckbox,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: [false],
      },
      { updateOn: 'blur' }
    );
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.errorMessage = null;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { email, password, rememberMe } = this.loginForm.value;
    this.loading = true;

    this.authService.login({ email, password }).pipe().subscribe({
      next: (res) => {
        if (rememberMe && res?.token) {
          this.authService.setToken(res.token);
        }
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = typeof err === 'string' ? err : 'Error en login';
        console.error('Error en login', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  logOut() {
    // Lógica para cerrar sesión
    this.router.navigate(['/login']);
  }
}
