import React from 'react';
import { MenuItem } from '../../types/menu';

interface MenuItemEditorProps {
  item: MenuItem;
  onUpdate: (item: MenuItem) => void;
  onDelete: () => void;
}

const MenuItemEditor: React.FC<MenuItemEditorProps> = ({
  item,
  onUpdate,
  onDelete,
}) => {
  const handleChange = (field: keyof MenuItem, value: string) => {
    onUpdate({
      ...item,
      [field]: value,
    });
  };

  return (
    <div className="menu-item-editor">
      <h3>編輯選單項目</h3>
      
      <div className="form-group">
        <label>文字內容：</label>
        <input
          type="text"
          value={item.text}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="輸入選單文字"
        />
      </div>

      <div className="form-group">
        <label>動作類型：</label>
        <select
          value={item.actionType}
          onChange={(e) => handleChange('actionType', e.target.value as MenuItem['actionType'])}
        >
          <option value="reply">回覆訊息</option>
          <option value="link">開啟連結</option>
          <option value="function">執行函數</option>
        </select>
      </div>

      <div className="form-group">
        <label>動作內容：</label>
        <input
          type="text"
          value={item.actionPayload || ''}
          onChange={(e) => handleChange('actionPayload', e.target.value)}
          placeholder={
            item.actionType === 'reply'
              ? '輸入回覆訊息'
              : item.actionType === 'link'
              ? '輸入URL連結'
              : '輸入函數名稱'
          }
        />
      </div>

      <div className="form-group">
        <button onClick={onDelete} className="delete-button">
          刪除項目
        </button>
      </div>
    </div>
  );
};

export default MenuItemEditor;