// 定義選單項目的介面
export interface MenuItem {
  id: string;
  text: string;
  icon?: string;
  actionType: 'reply' | 'link' | 'function';
  actionPayload?: string;
  children?: MenuItem[];
}

// 定義選單編輯器屬性的介面
export interface MenuEditorProps {
  initialData?: MenuItem[];
  onChange?: (data: MenuItem[]) => void;
  onSave?: (data: MenuItem[]) => void;
}

// 定義選單狀態的介面
export interface MenuState {
  items: MenuItem[];
  selectedItemId: string | null;
  isDragging: boolean;
}