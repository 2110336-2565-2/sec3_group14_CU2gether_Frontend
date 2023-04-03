import { useEffect, useState } from 'react';
import { Avatar, Card, Image, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import theme from '@/utils/theme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getStudentById } from 'api/student';

const { Content } = Layout;

const ProfileCard = styled(Card)`
    border-width: 1px;
    border-color: ${theme.color_level.gray.low};
`;

const ProfileContainer = styled(Layout)`
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    background-color: ${theme.color.white};
`;

const CoverImageCard = styled(ProfileCard)`
    width: 800px;
    height: 200px;
    border-width: 0px;
    background-color: ${theme.color.cu_pink};
`;

const ProfileInformationContainer = styled.div`
    display: flex;
    height: 75px;
`;

const ProfilePicture = styled(Avatar)`
    position: relative;
    background-color: ${theme.color.red};
    top: -75px;
    left: 4vw;
    border-width: 2px;
    border-color:  ${theme.color.white};
`;

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    margin-left: 8%;
`;

const InformationTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
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
    background-color: ${theme.color.white}
`;

const RecordCard = styled(ProfileCard)`
    width: 200px;
    height: 400px;
`;

const AboutContainer = styled(Content)`
    padding-top: 40px;
`;

const AboutCard = styled(ProfileCard)`
    width: 800px;
    height: 158px;
`;

const AboutContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AboutSubTitle = styled.p`
    font-size: 16px;
    color: ${theme.color_level.gray.low};
`;

const PreviousEventCard = styled(ProfileCard)`
    width: 560px;
    height: 400px;
`;

const PreviousEventSubTital = styled(Link)`
    font-size: 20px;
    color: ${theme.color_level.gray.low};
`;

const CardTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CardTitle = styled.h1`
    font-size: 24px;
    font-weight: 400;
`;

const profile = {
    firstName: String,
    lastName: String
}

const ProfilePage: React.FC<{}> = ({}) => {
    const [profile, setProfile] = useState({firstName: "John", lastName: "Doe"});

    useEffect(() => {
        getStudentById('6330476521')
        .then((data) => {
            setProfile(data);
        })
        .catch((err) => console.log(err))
    },[]);

    return (
    <ProfileContainer>
      <Content>
        <CoverImageCard/>
        <ProfileInformationContainer>
            <ProfilePicture size={150}/>
            <InformationContainer>
                <InformationTitle>{profile.firstName+' '+profile.lastName}</InformationTitle>
                <RoleWrapper>
                    <FontAwesomeIcon icon={faUserGraduate}/>
                    <RoleSubtitle>student</RoleSubtitle>
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
            <AboutContentContainer>
                <AboutSubTitle>Tell us about yourself</AboutSubTitle>
            </AboutContentContainer>
        </AboutCard>
      </AboutContainer>
      <Layout>
        <ContentContainer>
            <RecordCard>
                <CardTitle>Record</CardTitle>    
            </RecordCard>
            <PreviousEventCard>
                <CardTitleContainer>
                    <CardTitle>Event</CardTitle>
                    <PreviousEventSubTital href="">see all user's event {'>'}</PreviousEventSubTital>
                </CardTitleContainer>
            </PreviousEventCard>
        </ContentContainer>
      </Layout>
    </ProfileContainer>
  );
};

export default ProfilePage;