import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { connexionService } from "src/app/services/connexion.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  succeed = false;
  form: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private connexionService: connexionService,
    private router: Router
  ) {}

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  onSubmit() {
    this.connexionService.login(this.form.value).subscribe({
      next: (res) => {
        this.succeed = true;
        this.router.navigate(["/home"]);

        setTimeout(() => {
          this.succeed = false;
        }, 3000);
      },
      error: (err) => {
        console.log(err);

        this.form.setErrors({
          api: err,
        });
        setTimeout(() => {
          this.form.reset();
        }, 3000);
      },
    });
  }

  onLogout() {
    this.connexionService.logout();
  }

  ngOnInit(): void {}
}
