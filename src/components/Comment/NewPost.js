import React, { useState, useEffect } from 'react';
import { faEnvelope, faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomCkeditor from '../../containers/app/screens/MainTable/editor/CustomCKEditor';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertHtmlToMention } from 'utils/utils';
import { getListUsers } from 'services/comment';

const NewPost = ({ onSubmit, isReply = false }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState('<p></p>');
  const [items, setItems] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let isSubscribed = true;
    const users = await getListUsers();
    const d = users?.data?.data || [];
    const output = d.map((user) => {
      const { _id, name, userName } = user;
      return {
        id: '@' + userName,
        name,
        userId: _id,
      };
    });
    if (isSubscribed) setItems(output);
    return () => (isSubscribed = false);
  };

  const onClickEmoji = (e) => {
    e.preventDefault();
  };
  const onEmojiClick = (event, emojiObject) => {
    setContent(
      content.substr(0, content.length - 4) +
        emojiObject.emoji +
        content.substr(-4),
    );
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    onSubmit(convertHtmlToMention(content));
    setShowEditor(false);
    setContent('<p></p>');
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    setShowEditor(false);
    setContent('<p></p>');
  };

  const emojiComponent = (
    <Picker
      onEmojiClick={onEmojiClick}
      disableAutoFocus={true}
      skinTone={SKIN_TONE_MEDIUM_DARK}
      groupNames={{ smileys_people: 'PEOPLE' }}
      native
    />
  );

  return (
    <div className={isReply ? 'new_post m0' : 'new_post'}>
      {!showEditor ? (
        <div>
          <button
            className="new_post_placeholder"
            onClick={(e) => {
              e.preventDefault();
              setShowEditor(true);
            }}
          >
            {isReply ? t('writeAnReply') : t('writeAnUpdate')}
          </button>
          {!true && (
            <div className="send_update_wrapper">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="regular_msg mx-1">
                {' '}
                {t('writeUpdatesViaEmail')}
              </span>
              <span className="email_wrapper">
                <div className="pulse_email">
                  <div className="mail-to-board-mail-container"></div>
                </div>
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          <CustomCkeditor
            onTextChange={setContent}
            initContent={content}
            items={items}
          />
          <div className="action_wrapper">
            <div className="post-buttons-wrapper">
              <Dropdown overlay={emojiComponent} trigger={['click']}>
                <a href="#" onClick={onClickEmoji}>
                  <FontAwesomeIcon icon={faSmileBeam} /> Emoji
                </a>
              </Dropdown>
            </div>
            <button
              className="style-button--size-small style-button"
              style={{
                height: '32px',
                backgroundColor: '#fff',
                color: '#0085ff',
                padding: '4px 8px',
              }}
              onClick={onClickCancel}
            >
              {t('cancel')}
            </button>
            <button
              className="style-button--size-small style-button"
              style={{
                // width: '60px',
                height: '32px',
                backgroundColor: '#0085ff',
                color: '#fff',
                padding: '4px 8px',
              }}
              onClick={onClickUpdate}
            >
              {t('update')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPost;
