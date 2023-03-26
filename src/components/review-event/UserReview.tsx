import React from "react";
import { Rate, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const { Text } = Typography;

const UserReview: React.FC<{
  username: string;
  reviewDate: string;
  reviewTime: string;
  score: number;
  comment?: string;
}> = ({ username, reviewDate, reviewTime, score, comment }) => {
  return (
    <DetailsContainer>
      <DetailText>{username}</DetailText>
      <DetailText>
        {reviewDate} {reviewTime}
      </DetailText>
      <Rate value={score} disabled={true} />
      {comment && <CommentText>{comment}</CommentText>}
    </DetailsContainer>
  );
};

export default UserReview;

const DetailsContainer = styled.div`
  width: 45vw;
	min-height: 100px;
  display: flex;
  flex-direction: column;
  border-color: ${theme.color_level.gray.low};
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
