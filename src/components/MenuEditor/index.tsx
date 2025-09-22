import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem, MenuEditorProps, MenuState } from '../../types/menu';
import MenuItemEditor from './MenuItemEditor';
import MenuPreview from './MenuPreview';
import './styles.css';

const MenuEditor: React.FC<MenuEditorProps> = ({
  initialData = [],
  onChange,
  onSave,
}) => {
  const [state, setState] = useState<MenuState>({
    items: initialData,
    selectedItemId: null,
    isDragging: false,
  });

  const handleAddItem = useCallback(() => {
    const newItem: MenuItem = {
      id: uuidv4(),
      text: '新選單項目',
      actionType: 'reply',
      actionPayload: '',
    };

    setState((prev) => {
      const newItems = [...prev.items, newItem];
      onChange?.(newItems);
      return {
        ...prev,
        items: newItems,
        selectedItemId: newItem.id,
      };
    });
  }, [onChange]);

  const handleUpdateItem = useCallback((updatedItem: MenuItem) => {
    setState((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      onChange?.(newItems);
      return {
        ...prev,
        items: newItems,
      };
    });
  }, [onChange]);

  const handleDeleteItem = useCallback((itemId: string) => {
    setState((prev) => {
      const newItems = prev.items.filter((item) => item.id !== itemId);
      onChange?.(newItems);
      return {
        ...prev,
        items: newItems,
        selectedItemId: null,
      };
    });
  }, [onChange]);

  const handleSave = useCallback(() => {
    onSave?.(state.items);
  }, [onSave, state.items]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="menu-editor">
        <div className="menu-editor__toolbar">
          <button onClick={handleAddItem}>新增項目</button>
          <button onClick={handleSave}>儲存</button>
        </div>
        
        <div className="menu-editor__content">
          <MenuPreview
            items={state.items}
            selectedItemId={state.selectedItemId}
            onSelectItem={(id) => setState((prev) => ({ ...prev, selectedItemId: id }))}
            onMoveItem={(dragId, hoverId) => {
              // TODO: Implement drag and drop reordering
            }}
          />
          
          {state.selectedItemId && (
            <MenuItemEditor
              item={state.items.find((item) => item.id === state.selectedItemId)!}
              onUpdate={handleUpdateItem}
              onDelete={() => handleDeleteItem(state.selectedItemId!)}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default MenuEditor;
