import Icon from 'components/Icon';
import React, { useState } from 'react';
import folderIcon from 'assets/icons/editMultiLanuage.svg';
import './styles.scss';
import { Input, Form } from 'antd';

export function CharacterItem({
  character,
  setCharacter,
  isOpenEdit,
  onEditValue,
}) {
  const handleClick = () => {
    if (character) {
      setCharacter(character);
    }
    if (isOpenEdit) {
      setCharacter({});
    }
  };
  const onFinish = (values) => {
    onEditValue(values.character);
  };

  return (
    <div className="character-item-wrapper">
      {isOpenEdit ? (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="character" initialValue={character.keyWord}>
            <Input
              placeholder="Enter"
              autoFocus
              size="small"
              bordered={false}
            />
          </Form.Item>
        </Form>
      ) : (
        <span className="character-title">{character.keyWord}</span>
      )}
      <Icon
        cursorPointer
        cover
        src={folderIcon}
        width="16"
        height="16"
        margin="0 0 0 14px"
        onClick={handleClick}
      />
    </div>
  );
}
