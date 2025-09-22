import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MenuItem } from '../../types/menu';

interface MenuPreviewProps {
  items: MenuItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  onMoveItem: (dragId: string, hoverId: string) => void;
}

interface DragItem {
  id: string;
  type: string;
}

const MenuItemPreview: React.FC<{
  item: MenuItem;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  onMoveItem: (dragId: string, hoverId: string) => void;
}> = ({ item, isSelected, onClick, index, onMoveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'menuItem',
    item: { id: item.id, type: 'menuItem' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'menuItem',
    hover: (draggedItem: DragItem) => {
      if (draggedItem.id !== item.id) {
        onMoveItem(draggedItem.id, item.id);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`menu-item-preview ${isSelected ? 'selected' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
      onClick={onClick}
    >
      <div className="menu-item-preview__content">
        <span className="menu-item-preview__text">{item.text}</span>
        <span className="menu-item-preview__type">{item.actionType}</span>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="menu-item-preview__children">
          {item.children.map((child, childIndex) => (
            <MenuItemPreview
              key={child.id}
              item={child}
              isSelected={false}
              onClick={() => {}}
              index={childIndex}
              onMoveItem={onMoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuPreview: React.FC<MenuPreviewProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  onMoveItem,
}) => {
  return (
    <div className="menu-preview">
      <h3>選單預覽</h3>
      <div className="menu-preview__items">
        {items.map((item, index) => (
          <MenuItemPreview
            key={item.id}
            item={item}
            isSelected={item.id === selectedItemId}
            onClick={() => onSelectItem(item.id)}
            index={index}
            onMoveItem={onMoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuPreview;