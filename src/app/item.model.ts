// Shape of an item as returned by the backend API.
export interface Item {
  id: number;
  name: string;
  category: string;
}

// Payload sent when creating a new item.
export interface CreateItemRequest {
  name: string;
  category: string;
}
