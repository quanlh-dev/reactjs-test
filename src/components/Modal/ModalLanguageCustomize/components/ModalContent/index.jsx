import React, { useState } from 'react';
import { Checkbox, Form, Select } from 'antd';
import './styles.scss';
import { listKey } from './dataFake';
import { CharacterItem } from './CharacterItem/index';

export function ModalContent({ cate }) {
  const { Option } = Select;
  const [checkedMenuLeft, setCheckedMenuLeft] = useState(true);
  const [checkedWorkPlace, setCheckedWorkPlace] = useState(true);
  const [listCharater, setListCharacter] = useState(listKey);
  const [characterSelected, setCharacterSelected] = useState({});

  const setCharacter = (character) => {
    setCharacterSelected(character);
  };

  const onEditValue = (value) => {
    const updatedData = listCharater.map((x) =>
      x.id === characterSelected.id ? { ...x, keyWord: value } : x,
    );
    setListCharacter(updatedData);
    setCharacterSelected({});
  };

  return (
    <div className="modal-content-wrapper">
      <h4 className="modal-title">
        Các từ chuyên ngành <span className="cate-name">{cate.name}</span>
      </h4>
      <Form>
        <Form.Item style={{ width: 150 }}>
          <Select placeholder="Chọn module">
            <Option value="icom">Incom</Option>
            <Option value="tc">Tài chính</Option>
            <Option value="project">Project & Task</Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="change-language-section">
        <Checkbox
          checked={checkedMenuLeft}
          onChange={(e) => setCheckedMenuLeft(e.target.checked)}
        >
          <span className="checked-title">
            Khu vực menu trái (Left menu area)
          </span>
        </Checkbox>
        {checkedMenuLeft && (
          <div className="setting-language-section">
            {listCharater.map((item) => (
              <CharacterItem
                key={item.id}
                character={item}
                setCharacter={setCharacter}
                isOpenEdit={item.id === characterSelected.id}
                onEditValue={onEditValue}
              />
            ))}
          </div>
        )}
      </div>

      <div className="change-language-section">
        <Checkbox
          checked={checkedWorkPlace}
          onChange={(e) => setCheckedWorkPlace(e.target.checked)}
        >
          <span className="checked-title">Khu vực làm việc (Work place)</span>
        </Checkbox>
        {checkedWorkPlace && <h6>Hiển thị</h6>}
      </div>
    </div>
  );
}
