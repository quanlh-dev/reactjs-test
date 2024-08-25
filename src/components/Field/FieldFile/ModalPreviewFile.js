import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const ModalPreviewFile = ({
  visible,
  onClose,
  selectedFile,
  files,
  showIcon,
  downloadFile,
  handleDeleteFile,
}) => {
  const { t } = useTranslation();
  const [currentFile, setCurrentFile] = useState({});

  const onDelete = () => {
    handleDeleteFile(currentFile);
    setCurrentFile(files[0]);
  };

  useEffect(() => {
    setCurrentFile(selectedFile);
  }, [selectedFile]);

  useEffect(() => setCurrentFile({}), []);

  const showFilePreview = () => {
    if (files && files.length) {
      return files.map((item, i) => (
        <div className="icon-file" onClick={() => setCurrentFile(item)}>
          {showIcon(item)}
        </div>
      ));
    }
    return '';
  };
  return (
    <Modal
      className="modal-task-container modal-preview-file"
      visible={visible}
      onCancel={onClose}
      closable={false}
      footer={null}
      width={800}
    >
      <Row>
        <Col span={2} className="preview-left">
          <div>{showFilePreview()}</div>
        </Col>
        <Col span={16} className="preview-center">
          <div
            className={`preview-content ${
              currentFile.fileMimeType !== 'image/png' ? 'full-width' : ''
            }`}
          >
            <div>{showIcon(currentFile, '', '100%', '100%')}</div>
          </div>
        </Col>
        <Col span={6} className="preview-right">
          <Row className="info-title">
            <Col span={20}>{t('previewFileInfo')}</Col>
            <Col span={4} className="icon-close">
              <CloseOutlined onClick={onClose} />
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={14}>{t('previewFileName')}:</Col>
            <Col span={10} className="preview-text">
              {currentFile.fileName}
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={14}>{t('previewFileType')}:</Col>
            <Col span={10} className="preview-text">
              {currentFile.fileMimeType}
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={14}>{t('previewFileDate')}:</Col>
            <Col span={10} className="preview-text">
              10/10/2021
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={14}>{t('previewFileSize')}:</Col>
            <Col span={10} className="preview-text">
              100KB
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={14}>{t('previewFileUploadBy')}:</Col>
            <Col span={10} className="preview-text">
              Gnab
            </Col>
          </Row>
          <div className="preview-action">
            <div
              className="action-item"
              onClick={() => downloadFile(currentFile)}
            >
              <DownloadOutlined /> Tải file về máy
            </div>
            <div className="action-item" onClick={onDelete}>
              <DeleteOutlined /> Xoá file
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPreviewFile;
