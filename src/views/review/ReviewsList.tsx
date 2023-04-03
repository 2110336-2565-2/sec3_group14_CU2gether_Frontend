import UserReview from "@/components/review-event/UserReview";
import { ReviewDetail } from "@/hooks/useReviewStore";
import theme from "@/utils/theme";
import { Empty, Typography } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";

type ReviewFormProps = {
  reviewForm?: React.ReactNode;
  reviewList: ReviewDetail[];
};

const { Title } = Typography;

export const ReviewsList: React.FC<ReviewFormProps> = ({
  reviewForm,
  reviewList,
}) => {
  const reviewScore = useMemo(() => {
    const reviewAmount = reviewList.length;
    const totalScore = reviewList.reduce((acc, cur) => acc + cur.score, 0);
    const averageScore =
      reviewAmount > 0 ? Math.round((totalScore * 10) / reviewAmount) / 10 : 0;

    return (
      <ReviewScoreContainer>
        <Title level={5}>Rating Score: </Title>
        <DetailContainer>
          <span style={{ fontSize: "2.25rem" }}>{averageScore}</span>(
          {reviewAmount} reviews)
        </DetailContainer>
      </ReviewScoreContainer>
    );
  }, [reviewList]);

  const list = useMemo(
    () =>
      reviewList.length > 0 ? (
        reviewList.map((reviewDetail: ReviewDetail, idx: number) => (
          <UserReview key={`review-${idx}`} reviewDetail={reviewDetail} />
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No review" />
      ),
    [reviewList]
  );

  return (
    <ReviewsListContainer>
      {reviewScore}
      {reviewForm}
      {list}
    </ReviewsListContainer>
  );
};

const ReviewScoreContainer = styled.div`
  color: ${theme.color.primary};
  display: flex;
  align-items: center;
  gap: 5px;
  .ant-typography {
    color: ${theme.color.primary};
    margin: 0;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
`;

const ReviewsListContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 2vh 0;
`;
