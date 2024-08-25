import {
  faThumbsUp,
  faBell,
  faClock,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { getComment } from 'services/comment';
import { Spin } from 'antd';
import { postComment } from 'services/comment';
import { likeComment, unLikeComment } from 'services/comment';
import { converMentionToHTML } from 'utils/utils';

const ItemPost = ({ data }) => {
  const {
    attachments = [],
    content,
    createBy,
    createdAt,
    likes = [],
    isLike,
    task,
    _id,
  } = data;

  const { t } = useTranslation();
  const [replies, setReplies] = useState([]);
  const [isLikePost, setIsLikePost] = useState(false);
  const [numberLikePost, setNumberLikePost] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLikePost(data?.isLike);
    setNumberLikePost(data?.likes?.length || 0);
  }, [data]);

  const formatTime = (time) => {
    const distance = new Date() - time;
    if (distance / 1000 / 60 < 1) return t('fewSecondsAgo');
    if (distance / 1000 / 60 / 60 < 1)
      return Math.floor(distance / 1000 / 60) + ' ' + t('minutesAgo');
    if (distance / 1000 / 60 / 60 / 24 < 1)
      return Math.floor(distance / 1000 / 60 / 60) + ' ' + t('hoursAgo');
    return Math.floor(distance / 1000 / 60 / 60 / 24) + ' ' + t('daysAgo');
  };

  const onSubmit = async (content) => {
    console.log(`content`, content);
    setLoading(true);
    const data = await postComment({
      parentId: _id,
      content,
    });

    if (data?.data?.code === 200) {
      const newReplies = [...replies];
      newReplies.unshift(data?.data?.data || []);
      setReplies(newReplies);
    }
    setLoading(false);
  };

  const onClickReply = async () => {
    const data = await getComment({
      level: 'COMMENT',
      entityId: _id,
    });
    setReplies(data?.data?.data || []);
    setShowReply(true);
  };

  const actionLikeComment = async (id, isLikeLocal, comment = false) => {
    if (!isLikeLocal) await likeComment({ commentId: id });
    else await unLikeComment({ commentId: id });
    if (!comment) await onClickReply();
    else {
      if (isLikeLocal) {
        setNumberLikePost((x) => x - 1);
      } else {
        setNumberLikePost((x) => x + 1);
      }
      setIsLikePost((isLikePost) => !isLikePost);
    }
  };

  return (
    <div className="post">
      <div className="post_header">
        <div className="post_title">
          <img
            src="https://cdn1.monday.com/dapulse_default_photo.png"
            className="person-bullet-image person-bullet-component post-header-person-bullet"
          />
          <div className="title">
            <span style={{ display: 'flex' }}>
              <a className="user_name" href="">
                {createBy?.name}
              </a>
              <div className="user-activity-indication-component">
                <div className="dot online-indication" />
              </div>
            </span>
          </div>
          <div>
            <div>
              <div className="post_top_right_wrapper">
                <div className="post_time_wrapper-square"></div>
                <div style={{ marginRight: '4px' }}>
                  <FontAwesomeIcon icon={faClock} />{' '}
                  {formatTime(new Date(createdAt))}
                </div>
                <div style={{ marginRight: '4px' }}>
                  {/* <FontAwesomeIcon icon={faBell} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="post_body">
        <div className="body_text">
          <p
            dangerouslySetInnerHTML={{ __html: converMentionToHTML(content) }}
          ></p>
        </div>
      </div>

      <div className="post-action-bar-component-wrapper">
        <div className="post-actions-component">
          <div className="upper-row">
            <div className="like-bar-component">
              <div className="mx-1">{numberLikePost + ' '}</div>
              <FontAwesomeIcon icon={faThumbsUp} />{' '}
            </div>
            <div className="right-box-container">
              {/* <div className="watched-bookmark-container">
                <FontAwesomeIcon icon={faEye} />{' '}
                <div className="mx-1">{0 + ' ' + t('seen')}</div>
              </div> */}
            </div>
          </div>
          <div className="post-actions-like-reply">
            <button className="like-button-component">
              <div
                className="like-button-component-inner"
                style={isLikePost ? { color: '#0085ff' } : {}}
                onClick={() => {
                  actionLikeComment(_id, isLikePost, true);
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />{' '}
                <div className="mx-1">{' ' + t('like')}</div>
              </div>
              <div className="like-reply-separator" />
            </button>
            <button
              className="reply-button-component prevent-on-blur-editor keep-focus"
              onClick={onClickReply}
            >
              <div className="reply-button-component-inner">
                <FontAwesomeIcon icon={faReply} />{' '}
                <div className="mx-1">{' ' + t('reply')}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      {showReply && (
        <Spin spinning={loading}>
          <div className="replay_area">
            <div>
              <div className="reply-list-component">
                <div className="reply-component">
                  {replies.map((r) => {
                    const { content, createBy, createdAt, likes, _id, isLike } =
                      r;
                    return (
                      <div className="reply-body-component" key={_id}>
                        <img
                          src="https://cdn1.monday.com/dapulse_default_photo.png"
                          className="person-bullet-image person-bullet-component post-reply-person-bullet"
                        />
                        <div className="reply_body body linkify">
                          <div className="reply-body-wrapper">
                            <a href="#" className="user_name router">
                              {createBy?.name}
                            </a>
                            <div className="reply-body-inner">
                              <div
                                className="body_text"
                                dangerouslySetInnerHTML={{
                                  __html: converMentionToHTML(content),
                                }}
                              />
                            </div>
                          </div>
                          <div className="details">
                            <span className="detail_tools">
                              <span className="humanize">
                                <FontAwesomeIcon icon={faClock} />{' '}
                                {formatTime(new Date(createdAt))}
                              </span>
                              <span className="reply-watched-posts-component">
                                0 <FontAwesomeIcon icon={faEye} />
                              </span>
                              <a
                                href="#"
                                className="reply-like-button-component"
                                onClick={(e) => {
                                  e.preventDefault();
                                  actionLikeComment(_id, isLike);
                                }}
                              >
                                {likes.length + ' '}
                                <FontAwesomeIcon
                                  icon={faThumbsUp}
                                  style={isLike ? { color: '#0085ff' } : {}}
                                />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="new-reply-component">
                <div className="new-reply-component-not-opened">
                  <img
                    src="https://cdn1.monday.com/dapulse_default_photo.png"
                    className="person-bullet-image person-bullet-component post-reply-person-bullet"
                  />
                  <div className="reply_btn">
                    <NewPost onSubmit={onSubmit} isReply={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      )}
    </div>
  );
};

export default ItemPost;
