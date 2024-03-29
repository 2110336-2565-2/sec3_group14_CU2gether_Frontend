import React from "react";
import { Rate, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { ReviewDetail } from "@/hooks/useReviewStore";

const { Text } = Typography;

const UserReview: React.FC<{
  reviewDetail: ReviewDetail;
  reviewId?: string;
}> = ({ reviewDetail }) => {
  return (
    <DetailsContainer>
      <DetailText>{reviewDetail.authorName}</DetailText>
      <DetailText>
        {dayjs(reviewDetail.createdAt).format("YYYY-MM-DD HH:mm")}
      </DetailText>
      <Rate allowHalf value={reviewDetail.score} disabled={true} />
      {reviewDetail.comment && (
        <CommentText>{reviewDetail.comment}</CommentText>
      )}
    </DetailsContainer>
  );
};

export default UserReview;

const DetailsContainer = styled.div`
  width: 45vw;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  border-color: ${theme.color.border};
  border-style: solid;
  border-radius: 0.4rem;
  padding: 5px 10px;

  ${theme.media.tablet} {
    width: 80vw;
  }
`;
const DetailText = styled(Text)`
  font-size: 0.75rem;
`;

const CommentText = styled(Text)`
  font-size: 1rem;
`;
