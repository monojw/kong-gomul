import React from "react";
import styled, { css } from "styled-components";

const BooksThumbContainer = styled.div`
  & > * {
    margin-bottom: 5px;
    text-align: center;
  }
  .category {
    text-align: left;
  }
  .title {
    font-weight: bold;
  }

  ${(props) => {
    if (props.size === "big") {
      return css`
        .category {
          font-size: 14px;
        }
        .title {
          font-size: 20px;
          margin-bottom: 15px;
        }
        .author {
          font-size: 12px;
        }
        .publisher {
          font-size: 12px;
        }
      `;
    }

    if (props.size === "small") {
      return css`
        .category {
          text-align: center;
          font-size: 14px;
        }
        .thumbnail {
          display: block;
          margin: 0 auto 20px;
          width: 100px;
        }
        .title {
          font-size: 20px;
          margin-bottom: 15px;
        }
        .author {
          font-size: 12px;
        }
        .publisher {
          font-size: 12px;
        }
      `;
    }
  }}
`;

const BooksThumb = ({ size, category, thumbnail, title, author, publisher }) => {
  return (
    <BooksThumbContainer size={size} title={title} author={author} publisher={publisher}>
      <p className="category">{category}</p>
      <img src={thumbnail} alt="책 섬네일" className="thumbnail" />
      <h3 className="title">{title}</h3>
      <p className="author">{author}</p>
      <p className="publisher">{publisher}</p>
    </BooksThumbContainer>
  );
};

BooksThumb.defaultProps = {
  size: "big",
  category: "카테고리",
  thumbnail: "https://via.placeholder.com/195x260",
  title: "타이틀",
  author: "저자 없음",
  publisher: null,
};

export default BooksThumb;
