import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeroCardComponent } from "./hero-card/hero-card.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeroCardComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "sehr-viel-sehr";
}
