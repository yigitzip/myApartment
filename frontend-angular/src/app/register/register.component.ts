import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService  // AuthService'i enjekte et
  ) { }

  ngOnInit(): void {
    // Reactive form oluşturma
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      apartmentName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Formu gönderme işlemi
  onRegister(): void {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      console.log('Register Data:', registerData);

      // AuthService'i kullanarak register işlemi yapalım
      this.authService.register(registerData.username, registerData.password, registerData.apartmentName).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Burada kullanıcıyı login sayfasına yönlendirebilir veya başka bir işlem yapabilirsiniz
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Hata durumunda kullanıcıya bir mesaj gösterebilirsiniz
        }
      });
    }
  }
}
