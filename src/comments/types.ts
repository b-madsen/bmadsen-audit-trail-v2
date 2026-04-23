export interface Comment {
  id: string;
  selector: string;
  anchorEdge?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offsetX?: number;
  offsetY?: number;
  author: string;
  text: string;
  timestamp: string;
}

export type CommentMap = Record<string, Comment[]>;
