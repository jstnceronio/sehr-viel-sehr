import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { WordPair } from "../hero-card/hero-card.component";

@Component({
  selector: "app-suggestion-dialog",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./suggestion-dialog.component.html",
  styleUrl: "./suggestion-dialog.component.scss",
})
export class SuggestionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuggestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WordPair,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
