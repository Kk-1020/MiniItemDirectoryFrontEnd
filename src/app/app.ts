import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from './item.service';
import { Item } from './item.model';

/**
 * Single-screen UI: add an item, and search items by name.
 */
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly itemService = inject(ItemService);

  // Add-item form fields.
  readonly name = signal('');
  readonly category = signal('Book');
  readonly categories = ['Book', 'Movie', 'Product'];

  // Search box.
  readonly searchQuery = signal('');

  // Results and status messages.
  readonly items = signal<Item[]>([]);
  readonly addMessage = signal('');
  readonly addError = signal('');
  readonly listError = signal('');

  ngOnInit(): void {
    this.search(); // Show all items on first load.
  }

  /** Sends the form to POST /items, then refreshes the list. */
  addItem(): void {
    this.addMessage.set('');
    this.addError.set('');

    const name = this.name().trim();
    if (!name) {
      this.addError.set('Name is required.');
      return;
    }

    this.itemService.createItem({ name, category: this.category() }).subscribe({
      next: (created) => {
        this.addMessage.set(`Added "${created.name}".`);
        this.name.set('');
        this.search();
      },
      error: (err: HttpErrorResponse) => this.addError.set(this.describeError(err)),
    });
  }

  /** Calls GET /items?q=... and updates the result list. */
  search(): void {
    this.listError.set('');
    this.itemService.searchItems(this.searchQuery()).subscribe({
      next: (results) => this.items.set(results),
      error: (err: HttpErrorResponse) => {
        this.listError.set(this.describeError(err));
        this.items.set([]);
      },
    });
  }

  private describeError(err: HttpErrorResponse): string {
    if (err.status === 400 && err.error?.fieldErrors) {
      return Object.values(err.error.fieldErrors as Record<string, string>).join(' ');
    }
    if (err.status === 0) {
      return 'Cannot reach the API. Is the backend running?';
    }
    return `Request failed (HTTP ${err.status}).`;
  }
}
