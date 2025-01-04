import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WordPairService } from "./word-pair.service";
import { MatDialog } from "@angular/material/dialog";
import { SuggestionDialogComponent } from "../suggestion-dialog/suggestion-dialog.component";

export interface WordPair {
  id: string;
  base: string; // The base word/phrase
  replacement: string; // The suggested replacement
  isApproved: boolean; // Whether the word pair is approved
  created: string; // ISO string for creation date
  updated: string; // ISO string for last update date
}

export interface GetWordPairsResponse {
  page: number;
  perPage: number; // Number of items per page
  totalItems: number; // Total number of items
  totalPages: number; // Total number of pages
  items: WordPair[]; // Array of word pair records
}

@Component({
  selector: "hero-card",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SuggestionDialogComponent],
  templateUrl: "./hero-card.component.html",
  styleUrl: "./hero-card.component.scss",
})
export class HeroCardComponent {
  private readonly wordpairService = inject(WordPairService);
  private readonly dialog = inject(MatDialog);

  adjective: string = "";
  replacement: string = "";

  onSearchPress(): void {
    if (this.adjective) {
      this.wordpairService
        .getApprovedReplacementForWord(this.adjective)
        .subscribe((res: GetWordPairsResponse) => {
          this.replacement = res.items[0].replacement;
        });
    }
  }

  onResetPress(): void {
    this.adjective = "";
    this.replacement = "";
  }

  onRandomPress(): void {
    this.wordpairService
      .getFilteredWordPairs("isApproved=true")
      .subscribe((res: GetWordPairsResponse) => {
        let pair = this.getRandomPair(res.items);
        this.adjective = pair.base;
        this.replacement = pair.replacement;
      });
  }

  private getRandomPair(pairs: WordPair[]): WordPair {
    return pairs[Math.floor(Math.random() * pairs.length)];
  }

  onSuggestionPress(): void {
    const dialogRef = this.dialog.open(SuggestionDialogComponent, {
      width: "400px",
      data: { base: "", replacement: "" },
      position: { right: "0px", top: "0px" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Dialog result:", result);
      }
    });
  }
}
