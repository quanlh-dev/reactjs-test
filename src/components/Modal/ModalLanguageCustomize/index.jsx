import { Modal, Row, Form, Select, Col } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
import { HeaderModal } from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';

export function ModalLanguageCustomize({ ...props }) {
  const { Option } = Select;

  const cates = [
    {
      id: 1,
      name: 'Small Cotton Cheese',
    },
    {
      id: 2,
      name: 'Sleek Cotton Sausages',
    },
    {
      id: 3,
      name: 'Awesome Metal Table',
    },
    {
      id: 4,
      name: 'Refined Steel Cheese',
    },
    {
      id: 5,
      name: 'Handmade Cotton Computer',
    },
    {
      id: 6,
      name: 'Licensed Rubber Chips',
    },
    {
      id: 7,
      name: 'Sleek Frozen Hat',
    },
  ];

  const [cateSelected, setCateSelected] = useState({
    id: 1,
    name: 'Small Cotton Cheese',
  });

  return (
    <Modal centered {...props} className="multi-language-modal">
      <HeaderModal />
      <div className="modal-body-wrapper">
        <Row>
          <Col span={4} className="modal-body-side-left">
            <div className="form-select-lang-wrapper">
              <Form>
                <p className="select-lang-lable">Chọn ngôn ngữ</p>
                <Form.Item>
                  <Select defaultValue="vn">
                    <Option value="vn">Tiếng Việt</Option>
                    <Option value="en">Tiếng Anh</Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className="category">
              <p className="category-title">Danh mục</p>
              <ul>
                {cates.map((cate) => (
                  <li key={cate.id} onClick={() => setCateSelected(cate)}>
                    <span
                      className={`${
                        cate.id === cateSelected.id ? 'active' : ''
                      } category-item`}
                    >
                      {cate.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col span={20} className="modal-main-content">
            <ModalContent cate={cateSelected} />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
