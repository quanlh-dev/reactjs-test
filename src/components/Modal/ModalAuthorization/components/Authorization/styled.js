import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 50px;
  padding-top: 10px;
  & .ant-table-thead > tr > th {
    color: #ffffff;
    background: #3187af;
    padding: 3.5px;
    font-weight: 700;
    font-size: 12px;
    border-bottom: none;
  }
  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    width: 4px;
    height: calc(100% + 2px);
    top: calc(50% - 1px);
    background-color: #ffffff;
  }
  & .ant-table-tbody > tr > td {
    padding: 5px;
    border-bottom: unset;
  }
  & tr.ant-table-row {
    border-bottom: 1px solid #65a5c3;
    &:last-child {
      border-bottom: unset;
    }
  }
  & .ant-table table {
    border-collapse: collapse;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 8px;
  color: #ffffff;
  font-size: 12px;
  border-radius: 5px;
  background: #3187af;
  width: 120px;
  height: 25px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 30px;
  cursor: pointer;
  background: white;
  &:hover {
    background: #dbdbdb;
  }
`;
