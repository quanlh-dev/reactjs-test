import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Table, Modal, Button, Dropdown, Checkbox, Select } from 'antd';
import { SettingOutlined, DownOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OrderSettingTable = (props) => {
  const dispatch = useDispatch();
  const { fullColumns } = props;
  const { defaultColumns } = props;
  const { actionColumn } = props;
  const selectValuesDefault = props.defaultColumns.map((item) => item.key);
  useEffect(() => {}, []);

  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState(defaultColumns);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectValues, setSelectValues] = useState(selectValuesDefault);
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#fff' : '#fff',
    display: 'flex',
    width: '100%',
    padding: 2,
    overflow: 'auto',
    justifyContent: 'space-between',
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
    const newSelectValues = newItems.map((item) => item.key);
    setSelectValues(newSelectValues);
    const t = newItems.slice();
    t.push(actionColumn);
    props.cbOrderSettingColumns(t);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const t = items.slice();
    t.push(actionColumn);
    props.cbOrderSettingColumns(t);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeSelectColumn = (values) => {
    const newColumns = [];
    values.forEach((element) => {
      newColumns.push(fullColumns.find((col) => col.key == element));
    });
    setSelectValues(values);
    setItems(newColumns);
  };

  return (
    <>
      <span onClick={showModal} style={{ float: 'right', cursor: 'pointer' }}>
        Sắp xếp cột hiển thị
        <SettingOutlined />
      </span>
      <Modal
        title="Sắp xếp cột hiển thị"
        visible={isModalVisible}
        onOk={handleOk}
        style={{ top: 20 }}
        width={1000}
        onCancel={handleCancel}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.key}
                    draggableId={item.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        style={{ border: '1px solid black' }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                      >
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Thêm cột cho bảng"
          onChange={handleChangeSelectColumn}
          value={selectValues}
          defaultValue={selectValuesDefault}
        >
          {fullColumns.map((item, index) => (
            <Select.Option key={item.key} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default OrderSettingTable;
