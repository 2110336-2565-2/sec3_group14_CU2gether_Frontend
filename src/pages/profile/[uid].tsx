import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Empty,
  Button,
  Input,
  Layout,
  Skeleton,
  Typography,
  Upload,
  Space,
} from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROLE } from "@/types";
import useEventStore from "@/hooks/useEventStore";
import EventCardInProfile from "@/components/event-card/CardInProfile";
import { CU_API } from "@/config";
import useProfileStore from "@/hooks/useProfileStore";
import { CameraAltRounded, Edit } from "@mui/icons-material";

const { Content } = Layout;
const { Text } = Typography;

const ProfilePage: React.FC<{}> = ({}) => {
  const { role, student, organizer, getProfile, updateProfile } =
    useProfileStore();
  const { events, fetchOwnEvents } = useEventStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isEditingName, setEditingName] = useState<boolean>(false);
  const [isEditingDescription, setEditingDescription] =
    useState<boolean>(false);
  const [isOwnUser, setOwnUser] = useState<boolean>(true);

  const router = useRouter();
  const { uid, isReady } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (uid) {
        try {
          console.log(role);
          await getProfile(uid.toString(), role ? role : ROLE.STUDENT);
          await fetchOwnEvents();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [uid]);

  const editDescription = () => {
    if (uid) {
      try {
        updateProfile(uid.toString(), role ? role : ROLE.STUDENT, {
          description,
        });
        router.reload();
      } catch (error) {
        console.log(error);
      }
    }
    setEditingDescription(false);
  };

  const editName = () => {
    if (uid) {
      try {
        switch (role) {
          case ROLE.STUDENT:
            updateProfile(uid.toString(), role, { firstName: name, lastName: lastName });
            break;
          case ROLE.ORGANIZER:
            updateProfile(uid.toString(), role, { name });
            break;
        }
        router.reload();
      } catch (error) {
        console.log(error);
      }
    }
    setEditingName(false);
  };

  const renderTitleName = () =>
    role === ROLE.STUDENT ? (
      <InformationTitle>
        {student.firstName + " " + student.lastName}
      </InformationTitle>
    ) : role === ROLE.ORGANIZER ? (
      <InformationTitle>{organizer.name}</InformationTitle>
    ) : null;

  const renderEditNameInput = () =>
    role === ROLE.STUDENT ? (
      <>
        <Input
          maxLength={100}
          onChange={(e) => setName(e.target.value)}
          onPressEnter={() => editName()}
          defaultValue={student.firstName}
          bordered={false}
          allowClear
        ></Input>
        <Space></Space>
        <Input
          maxLength={100}
          onChange={(e) => setLastName(e.target.value)}
          onPressEnter={() => editName()}
          defaultValue={student.lastName}
          bordered={false}
          allowClear
        ></Input>
      </>
    ) : role === ROLE.ORGANIZER ? (
      <Input
        maxLength={100}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={() => editName()}
        defaultValue={organizer.name}
        bordered={false}
        allowClear
      ></Input>
    ) : null;

  const renderRole = () =>
    role === ROLE.STUDENT ? (
      <RoleWrapper>
        <FontAwesomeIcon icon={faUserGraduate} />
        <RoleSubtitle>{role.toLowerCase()}</RoleSubtitle>
      </RoleWrapper>
    ) : role === ROLE.ORGANIZER ? (
      <RoleWrapper>
        <FontAwesomeIcon icon={faUserTie} />
        <RoleSubtitle>{role.toLowerCase()}</RoleSubtitle>
      </RoleWrapper>
    ) : null;

  const renderRecord = () =>
    role === ROLE.STUDENT ? (
      <StatisticContainer>
        <StatisticText>Join : {student.joinTimes}</StatisticText>
        <StatisticText>Unjoin : {student.unjoinTimes}</StatisticText>
        <StatisticText>Create : {student.createTimes}</StatisticText>
        <StatisticText>Cancel : {student.cancelTimes}</StatisticText>
      </StatisticContainer>
    ) : role === ROLE.ORGANIZER ? (
      <StatisticContainer>
        <StatisticText>Create : {organizer.createTimes}</StatisticText>
        <StatisticText>Cancel : {organizer.cancelTimes}</StatisticText>
      </StatisticContainer>
    ) : null;

  const renderEditDescriptionInput = () =>
    role === ROLE.STUDENT ? (
      <Input
        showCount
        maxLength={500}
        onChange={(e) => setDescription(e.target.value)}
        onPressEnter={() => editDescription()}
        defaultValue={student.description}
        bordered={false}
        allowClear
      ></Input>
    ) : role === ROLE.ORGANIZER ? (
      <Input
        showCount
        maxLength={500}
        onChange={(e) => setDescription(e.target.value)}
        onPressEnter={() => editDescription()}
        defaultValue={organizer.description}
        bordered={false}
        allowClear
      ></Input>
    ) : null;

  const renderDescription = () =>
    role === ROLE.STUDENT ? (
      <AboutContentContainer>
        {student.description ? (
          <AboutSubTitle>
            {description ? description : student.description}
          </AboutSubTitle>
        ) : (
          <NoDescriptionSubTitle>Tell us about yourself</NoDescriptionSubTitle>
        )}
      </AboutContentContainer>
    ) : role === ROLE.ORGANIZER ? (
      <AboutContentContainer>
        {organizer.description ? (
          <AboutSubTitle>
            {description ? description : organizer.description}
          </AboutSubTitle>
        ) : (
          <AboutSubTitle>Tell us about yourself</AboutSubTitle>
        )}
      </AboutContentContainer>
    ) : null;

  if (loading || isReady) return <Skeleton></Skeleton>;

  return (
    <ProfileContainer>
      <Content>
        <CoverImageCard
          cover={
            <CoverImage
              crossOrigin="anonymous"
              src={
                role === ROLE.STUDENT
                  ? student.coverImageUrl
                    ? CU_API + student.coverImageUrl.substring(1)
                    : ""
                  : organizer.coverImageUrl
                  ? CU_API + organizer.coverImageUrl.substring(1)
                  : ""
              }
            />
          }
        >
          {/* <Upload>
                <EditCoverImageButton
                    icon={<CameraAltRounded fontSize='small'/>} 
                >
                        Edit Cover photo
                </EditCoverImageButton>
            </Upload> */}
        </CoverImageCard>
        <ProfileInformationContainer>
          <ProfilePicture
            crossOrigin="anonymous"
            src={
              role === ROLE.STUDENT
                ? student.imageUrl
                  ? CU_API + student.imageUrl.substring(1)
                  : ""
                : organizer.imageUrl
                ? CU_API + organizer.imageUrl.substring(1)
                : ""
            }
          />
          {/* <Upload>
                <EditProfileImageButton 
                    shape="circle" 
                    icon={<CameraAltRounded fontSize='small'/>} 
                />
            </Upload> */}
          <InformationContainer>
            <NameContainer>
              {isEditingName ? renderEditNameInput() : renderTitleName()}
              {isOwnUser ? (
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{zIndex: 10}}
                  onClick={() => setEditingName(!isEditingName)}
                ></FontAwesomeIcon>
              ) : null}
            </NameContainer>
            {renderRole()}
          </InformationContainer>
        </ProfileInformationContainer>
      </Content>
      <AboutContainer>
        <AboutCard>
          <CardTitleContainer>
            <CardTitle>About</CardTitle>
            {isOwnUser ? (
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => setEditingDescription(!isEditingDescription)}
              ></FontAwesomeIcon>
            ) : null}
          </CardTitleContainer>
          {isEditingDescription
            ? renderEditDescriptionInput()
            : renderDescription()}
        </AboutCard>
      </AboutContainer>
      <Layout>
        <ContentContainer>
          <RecordCard>
            <CardTitle>Record</CardTitle>
            {renderRecord()}
          </RecordCard>
          <PreviousEventCard>
            <CardTitleContainer>
              <CardTitle>Event</CardTitle>
              <PreviousEventSubTital href="/events">
                see all user's event {">"}
              </PreviousEventSubTital>
            </CardTitleContainer>
            <PreviousContentContainer>
              {events ? (
                events.length !== 0 ? (
                  <EventCardInProfile event={events[0]} />
                ) : (
                  <EmptyData />
                )
              ) : (
                <EmptyData />
              )}
            </PreviousContentContainer>
          </PreviousEventCard>
        </ContentContainer>
      </Layout>
    </ProfileContainer>
  );
};

const ProfileCard = styled(Card)`
  border-width: 1px;
  border-color: ${theme.color_level.gray.low};
`;

const ProfileContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  width: 80%;
  ${theme.media.mobile} {
    width: 360px;
  }
`;

const CoverImageCard = styled(ProfileCard)`
  height: 200px;
  border-width: 0px;
  background-color: ${theme.color.cu_pink};

  ${theme.media.mobile} {
    margin-top: 21px;
    width: 360px;
    height: 90px;
  }
`;

const CoverImage = styled.img`
  height: 200px;
  border-width: 0px;
  object-fit: cover;

  ${theme.media.mobile} {
    margin-top: 21px;
    width: 360px;
    height: 90px;
  }
`;

const EditCoverImageButton = styled(Button)`
  display: flex;
  justify-content: center;
  position: relative;
  top: -70px;
  left: 550px;
`;

const ProfileInformationContainer = styled.div`
  display: flex;
  height: 84px;
  ${theme.media.mobile} {
    flex-direction: column;
  }
`;

const EditProfileImageButton = styled(Button)`
  position: relative;
  top: 30px;
  left: 10px;
`;

const ProfilePicture = styled(Avatar)`
  position: relative;
  top: -75px;
  left: 45px;
  width: 150px;
  height: 150px;
  border-width: 2px;
  background-color: ${theme.color_level.gray.light};
  border-color: ${theme.color.white};

  ${theme.media.mobile} {
    top: -35px;
    left: 140px;
    margin-bottom: -40px;
    width: 70px;
    height: 70px;
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-left: 60px;

  ${theme.media.mobile} {
    align-items: center;
    margin-left: 0;
  }
`;

const InformationTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;

  ${theme.media.mobile} {
    font-size: 20px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RoleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: ${theme.color_level.gray.low};
`;

const RoleSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-top: 43px;

  ${theme.media.tablet} {
    flex-direction: column;
    padding-top: 14px;
    gap: 14px;
  }
`;

const RecordCard = styled(ProfileCard)`
  width: 200px;
  height: 400px;
  ${theme.media.tablet} {
    width: 100%;
    height: 110px;
  }
`;

const AboutContainer = styled(Content)`
  padding-top: 40px;
  ${theme.media.mobile} {
    padding-top: 14px;
  }
`;

const AboutCard = styled(ProfileCard)`
  height: 158px;
`;

const AboutContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutSubTitle = styled(Text)`
  font-size: 16px;
`;

const NoDescriptionSubTitle = styled(Text)`
  font-size: 16px;
  color: ${theme.color_level.gray.low};
`;

const PreviousEventCard = styled(ProfileCard)`
  width: 80%;
  height: 400px;
  ${theme.media.tablet} {
    width: 100%;
    height: 210px;
  }
`;

const PreviousContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
`;

const PreviousEventSubTital = styled(Link)`
  font-size: 20px;
  color: ${theme.color_level.gray.low};

  ${theme.media.mobile} {
    font-size: 16px;
  }
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardTitle = styled(Text)`
  font-size: 24px;
  font-weight: 400;

  ${theme.media.tablet} {
    font-size: 20px;
  }

  ${theme.media.mobile} {
    font-size: 16px;
  }
`;

const EmptyData = styled(Empty)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  ${theme.media.tablet} {
    height: 150px;
  }
`;

const StatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 200px;

  ${theme.media.tablet} {
    height: 50px;
  }
`;

const StatisticText = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  ${theme.media.tablet} {
    font-size: 16px;
  }
  ${theme.media.mobile} {
    font-size: 14px;
  }
`;

export default ProfilePage;
