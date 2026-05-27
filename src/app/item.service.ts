import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateItemRequest, Item } from './item.model';

/**
 * Talks to the Mini Item Directory backend.
 */
@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/items`;

  /** POST /items — create a new item. */
  createItem(request: CreateItemRequest): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, request);
  }

  /** GET /items?q=... — list all items, or filter by name when query is set. */
  searchItems(query: string): Observable<Item[]> {
    let params = new HttpParams();
    if (query.trim()) {
      params = params.set('q', query.trim());
    }
    return this.http.get<Item[]>(this.baseUrl, { params });
  }
}
