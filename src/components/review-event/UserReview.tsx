import React, { useEffect } from "react";
import { Rate, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

import useReviewStore from "@/hooks/useReviewStore";

const { Text } = Typography;

const UserReview: React.FC<{
  firstname: string;
  lastname: string;
  reviewDate: string;
  reviewTime: string;
  score: number;
  comment?: string;
}> = ({ firstname, lastname, reviewDate, reviewTime, score, comment }) => {
  return (
    <DetailsContainer>
      <DetailText>{firstname} {lastname}</DetailText>
      <DetailText>
        {reviewDate} {reviewTime}
      </DetailText>
      <Rate value={score} disabled={true} />
      {comment && <CommentText>{comment}</CommentText>}
    </DetailsContainer>
  );
};

// const UserReview: React.FC<{ 
//   eventId: string 
// }> = ({ eventId }) => {
//   const { review, getReview } = useReviewStore();

//   useEffect(() => {
//     if (eventId) {
//       const getData = async (id: string) => {
//         try {
//           await getReview(id);
//         } catch (err) {
//           console.log(err)
//         }
//       };
//       getData(eventId.toString());
//     }
//   }, [eventId]);

//   return (
//     <DetailsContainer>
//       <DetailText>{review?.firstname}{review?.firstname}</DetailText>
//       <DetailText>
//         {review?.reviewDate} {review?.reviewTime}
//       </DetailText>
//       <Rate value={review?.score} disabled={true} />
//       {review?.comment && <CommentText>{review?.comment}</CommentText>}
//     </DetailsContainer>
//   );
// };

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
