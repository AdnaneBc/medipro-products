export interface Product {
  id: string;
  name: string;
  productImg: string;
  category: string;
  gammes: string[];
}

export type ElementType = "pdf" | "img" | "video" | "doc" | "zip"; // extend as needed

export interface Element {
  id: string;
  productId: string;
  name: string;
  group: string; // E.g. "Formation", "TAP", "Gadget"
  type: ElementType; // File type
  fileUrl: string; // Can be a Firebase URL or local path
}
