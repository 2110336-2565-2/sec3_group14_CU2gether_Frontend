import { Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import type { GetStaticProps } from "next";

type NotFoundPageProps = {};

const { Title, Paragraph } = Typography;

type Props = Record<string, never>;

export const getStaticProps: GetStaticProps<Props> = () => {
  return { props: {} };
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <CenteredDisplay>
      <MoodBadIcon sx={{ fontSize: "12rem", marginBottom: "50px" }} />
      <Title level={3}>404 - Page Not Found</Title>
      <Paragraph>
        The requested URL {asPath} was not found on this server.
      </Paragraph>
    </CenteredDisplay>
  );
};

const CenteredDisplay = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 10%;
`;

export default NotFoundPage;
