import React, { useEffect, useState } from 'react';
import 'components/Field/FieldFile/FieldFile.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import axiosClient from '../../../api/axiosClient';
import ModalPreviewFile from './ModalPreviewFile';

const { v4: uuidv4 } = require('uuid');

const urlFileManager = 'https://filemanager.crmdemo.net';
function FieldFile(props) {
  const { value = [], onSubmit = (v) => { }, className = '' } = props; // value =[ { "fileName": "File test thu 1", "fileId": "id_file_test_1", "fileMimeType": "image/jpeg" } ]
  const [imagePreviewUrls, setImagePreviewUrls] = useState([...value]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    if (value && value.length) {
      setImagePreviewUrls([...value]);
    }
  }, [value]);

  const inputId = uuidv4();
  const handleChangeImage = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    if (file) {
      const resp = await axiosClient.post(
        `${urlFileManager}/file/upload/document`,
        formData,
      );
      if (resp && resp.docsId) {
        const tmpValue = [...value];
        const fileSelected = {
          fileName: resp.name,
          fileId: resp.docsId,
          fileMimeType: resp.type,
        };
        tmpValue.push(fileSelected);
        onSubmit(tmpValue);
        // preview image
        reader.onloadend = () => {
          const tmpImagePreviewUrls = [...imagePreviewUrls];
          tmpImagePreviewUrls.push({
            url: reader.result,
            type: resp.type,
            ...fileSelected,
          });
          setImagePreviewUrls(tmpImagePreviewUrls);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const downloadFile = async (file) => {
    if (file && file.fileId) {
      window.open(`${urlFileManager}/uploads/${file.fileId}`, '_blank');
      // const resp = await axiosClient.get(
      //   `${urlFileManager}/uploads/${file.fileId}`,
      // );
    }
  };

  const getUrlImgFile = (file) => `${urlFileManager}/uploads/${file.fileId}`;

  const handleDeleteFile = (item) => {
    const tmpImagePreviewUrls = [...imagePreviewUrls];
    let index = -1;
    tmpImagePreviewUrls.map((file, i) => {
      if (file.fileId === item.fileId) index = i;
    });
    tmpImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(tmpImagePreviewUrls);
    onSubmit(tmpImagePreviewUrls);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  }

  const handleClickFile = (item) => {
    setVisibleModal(true);
    setSelectedFile(item);
  }

  const showIcon = (
    imagePreviewUrl = {
      fileId: '',
      fileMimeType: '',
      fileName: '',
    },
    className = '',
  ) => {
    let icon = faFileAlt;
    let styleIcon = {};
    const extension = imagePreviewUrl?.fileId?.split('.').pop();

    switch (extension) {
      case 'pdf':
        icon = faFilePdf;
        styleIcon = { color: '#EA8002' };
        break;
      case 'xlsx':
        icon = faFileExcel;
        styleIcon = { color: '#006C30' };
        break;
      case 'pptx':
        icon = faFilePowerpoint;
        styleIcon = { color: '#C54122' };
        break;
      case 'docx':
      case 'doc':
        icon = faFileWord;
        styleIcon = { color: '#2D76CD' };
        break;
      default:
        break;
    }

    return (
      <Tooltip title={imagePreviewUrl?.fileName}>
        <FontAwesomeIcon style={styleIcon} icon={icon} className={className} />
      </Tooltip>
    );
  };

  const getIconFile = (item, i, width = 26, height = 26) => {
    if (i === 3)
      return (
        <div className="file-more-icon">
          {imagePreviewUrls.length - 3}
        </div>
      );
    if (i > 3) return '';
    if (item.fileMimeType === 'image/png') {
      return (
        <img
          className="file-item"
          src={getUrlImgFile(item)}
          alt=""
          height={height}
          width={width}
        />
      );
    }
    return (
      <div>
        {showIcon(item, 'file-document-icon file-item')}
      </div>
    );
  }
  const showFilePreview = () => {
    if (imagePreviewUrls && imagePreviewUrls.length) {
      return imagePreviewUrls.map((item, i) => {
        return (
          <div onClick={() => handleClickFile(item)}>
            {getIconFile(item, i)}
          </div>
        )
      });
    }
    return '';
  };

  return (
    <div className={`field-file ${className}`}>
      <ModalPreviewFile
        visible={visibleModal}
        onClose={handleCloseModal}
        selectedFile={selectedFile}
        files={imagePreviewUrls}
        showIcon={getIconFile}
        downloadFile={downloadFile}
        handleDeleteFile={handleDeleteFile}
        />
      <FontAwesomeIcon className="field-file__icon" icon={faPlusCircle} />
      <div className="field-file__text">
        <div className="filePreview">{showFilePreview()}</div>
      </div>
      <label className="label-file-upload" htmlFor={inputId}>
        <input
          type="file"
          name="uploadFile"
          id={inputId}
          onChange={handleChangeImage}
          className="fileInput"
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

export default FieldFile;
