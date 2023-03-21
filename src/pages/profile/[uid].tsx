import { ReactNode, useEffect, useState } from 'react';
import { Avatar, Card, Image, Input, Layout, Skeleton, Typography } from 'antd';
import styled from 'styled-components';
import theme from '@/utils/theme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getStudentById, updateStudentById } from 'api/student';
import { student } from '@/types';
import { ROLE } from '@/utils/Enum';

const { Content } = Layout;
const { Text } = Typography;

const ProfileCard = styled(Card)`
    border-width: 1px;
    border-color: ${theme.color_level.gray.low};
`;

const ProfileContainer = styled(Layout)`
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    width: 80%;
    background-color: ${theme.color.white};
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

const ProfileInformationContainer = styled.div`
    display: flex;
    height: 84px;
    ${theme.media.mobile} {
        flex-direction: column;
    }
`;

const ProfilePicture = styled(Avatar)`
    position: relative;
    background-color: ${theme.color.red};
    top: -75px;
    left: 45px;
    width: 150px;
    height: 150px;
    border-width: 2px;
    border-color:  ${theme.color.white};

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
    background-color: ${theme.color.white};

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
    color: ${theme.color_level.gray.low};
`;

const PreviousEventCard = styled(ProfileCard)`
    width: 560px;
    height: 400px;
    ${theme.media.tablet} {
        width: 100%;
        height: 210px;
    }
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

const StatisticContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    ${theme.media.tablet} {
      height: 50px;
    }
`;

const StatisticText = styled(Text)`
    font-size: 20px;
    ${theme.media.tablet} {
      font-size: 16px;
    }
    ${theme.media.mobile} {
        font-size: 14px;
    }
`;

const initialProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "John@Doe.com",
    studentId: "0000000000",
    cardId: "card",
    description: "great",
    cancelTimes: 1,
    createTimes: 2,
    joinTimes: 3,
    unjoinTimes: 4,
    role: ROLE.STUDENT,
}

const ProfilePage: React.FC<{}> = ({}) => {
    const [ profile, setProfile ] = useState<student>(initialProfile);
    const [ isLoading, setLoading ] = useState<boolean>(false)
    const [ isEditingDescription, setEditingDescription ] = useState<boolean>(false); 

    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
      setLoading(true);
      if(uid) {
        getStudentById(uid.toString())
        .then((data) => {
            const {firstName, lastName, email, studentId, cardId, description, createTimes, cancelTimes, joinTimes, unjoinTimes } = data;
            const role = data.user.role.toLowerCase();
            setProfile({
                firstName: firstName,
                lastName: lastName,
                email: email,
                studentId: studentId,
                cardId: cardId,
                description: description,
                cancelTimes: cancelTimes,
                createTimes: createTimes,
                joinTimes: joinTimes,
                unjoinTimes: unjoinTimes,
                role: role,
            });
            setLoading(false);
        })
        .catch((err) => console.log(err))
      }
    },[uid]);

    const editDescription = (message: string) : void => {
        if(uid) {
           
        }
    }

    if(isLoading) return <Skeleton></Skeleton>

    return (
    <ProfileContainer>
      <Content>
        <CoverImageCard/>
        <ProfileInformationContainer>
            <ProfilePicture/>
            <InformationContainer>
                <InformationTitle>{profile.firstName+' '+profile.lastName}</InformationTitle>
                <RoleWrapper>
                    <FontAwesomeIcon icon={faUserGraduate}/>
                    <RoleSubtitle>{profile.role}</RoleSubtitle>
                </RoleWrapper>
            </InformationContainer>
        </ProfileInformationContainer>
      </Content>
      <AboutContainer>
        <AboutCard>
            <CardTitleContainer>
                <CardTitle>About</CardTitle>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </CardTitleContainer>
            {isEditingDescription 
            ? (<Input></Input>) 
            : (<AboutContentContainer>
                <AboutSubTitle>{profile.description ? profile.description : "Tell us about yourself"}</AboutSubTitle>
            </AboutContentContainer>)}
        </AboutCard>
      </AboutContainer>
      <Layout>
        <ContentContainer>
            <RecordCard>
                <CardTitle>Record</CardTitle>
                <StatisticContainer>
                    {profile.role === ROLE.STUDENT ? (<StatisticText>Join : {profile.joinTimes}</StatisticText>) : null}
                    {profile.role === ROLE.STUDENT ? (<StatisticText>UnJoin : {profile.unjoinTimes}</StatisticText>) : null}
                    <StatisticText>Create : {profile.createTimes}</StatisticText>
                    <StatisticText>Cancel : {profile.cancelTimes}</StatisticText>
                </StatisticContainer>
            </RecordCard>
            <PreviousEventCard>
                <CardTitleContainer>
                    <CardTitle>Event</CardTitle>
                    <PreviousEventSubTital href="/">see all user's event {'>'}</PreviousEventSubTital>
                </CardTitleContainer>
            </PreviousEventCard>
        </ContentContainer>
      </Layout>
    </ProfileContainer>
  );
};

export default ProfilePage;
