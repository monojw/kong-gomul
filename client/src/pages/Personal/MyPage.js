import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../../slices/MemberSlice";
import { getRecents } from "../../slices/RecentsSlice";

import Profile from "../../components/Profile/Profile";
import LibraryIcons from "../../components/Profile/LibraryIcons";
import BooksItem from "../../components/BooksItem";

const ProfileContainer = styled.div`
  text-align: center;
  width: 640px;
  margin: auto;
  border: solid 1px #eee;
  margin-bottom: 20px;
  border-radius: 10px;

  h3 {
    font-weight: bolder;
    margin: 10px;
  }

  button {
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  &.con3 {
    padding: 20px;
    position: relative;

    p {
      font-weight: bold;
      margin-bottom: 20px;
    }

    .more-btn {
      display: block;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      position: absolute;
      top: 12px;
      right: 0;
      background-color: #333;
      color: #eee;
    }

    .recent-list {
      padding: 10px;
      li {
        margin-right: 40px;
      }
    }
  }
`;

const MyPage = () => {
  //리덕스

  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.member);
  const { data: recentsData, loading: recentsLoading } = useSelector((state) => state.recents);

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getRecents());
    console.log(recentsData);
  }, [dispatch]);

  return (
    <ProfileContainer>
      {data && (
        <div className="inner">
          {/* 프로필 */}
          <Profile data={data} />
          {/* 보고싶어요, 내 서재, 취향분석 아이콘 */}
          <LibraryIcons />

          <section className="con3">
            <h3>최근 조회한 작품</h3>
            <ul className="recent-list flex-row">
              {recentsData ? (
                recentsData
                  .slice(0, 5)
                  .map((book) => (
                    <BooksItem
                      key={book.id}
                      book={book}
                      itemWidth={"20%"}
                      itemHeight={"auto"}
                      itemHref={`/bookinfo/${book.id}`}
                    />
                  ))
              ) : (
                <>조회한 작품이 없습니다</>
              )}
              {/* <BooksItem
                book={}
                itemWidth={"20%"}
                itemHeight="auto"
              /> */}
            </ul>
          </section>
        </div>
      )}
    </ProfileContainer>
  );
};

export default MyPage;
