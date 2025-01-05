import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GetWordPairsResponse } from "./hero-card.component";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WordPairService {
  private apiUrl = `${environment.apiUrl}/api/collections/wordpairs/records`;

  private readonly http = inject(HttpClient);
  /**
   * Fetches word pairs with a custom filter.
   * @param filter - A PocketBase-compatible filter string.
   * @returns Observable of GetWordPairsResponse
   */
  getFilteredWordPairs(filter: string): Observable<GetWordPairsResponse> {
    const params = new HttpParams().set("filter", filter);
    return this.http.get<GetWordPairsResponse>(this.apiUrl, { params });
  }
  /**
   * Fetches word pairs for a specific baseWord.
   * @param base - The base word to search for.
   * @returns Observable of a single WordPair or null.
   */
  getApprovedReplacementForWord(
    base: string,
  ): Observable<GetWordPairsResponse> {
    const filter = `base='${base}'`;
    return this.getFilteredWordPairs(filter);
  }
  /**
   * Adds an unapproved entry to the WordPair table.
   * @param base - The word to be improved upon.
   * @param replacement - The enhancement of the previous verb.
   * @returns nothing.
   */
  suggestWordPair(base: string, replacement: string) {
    return this.http.post(this.apiUrl, {
      base,
      replacement,
      isApproved: false,
    });
  }
}
