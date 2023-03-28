import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Layout,
  ConfigProvider,
  Upload,
} from "antd";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import { useRouter } from "next/router";
import { EventType, Visibility, MeetingType, Event } from "@/types";
import EventDetail from "@/components/report/EventDetail";
import FormData from "form-data";
import ReportIcon from "@mui/icons-material/Report";
import { useMediaQuery } from "react-responsive";
const { Content } = Layout;
const { Title, Text } = Typography;

const typeList = [
  { value: "SCAMMING", label: "Scamming" },
  { value: "DRUGS", label: "Drugs" },
  { value: "UNAUTHORIZED_PUBLIC_RACING", label: "Unauthorized public racing" },
  { value: "PUBLIC_LEWD", label: "Public Lewd" },
  { value: "GAMBLING", label: "Gambling" },
  { value: "VIOLENCE", label: "Violence" },
  { value: "DANGER", label: "Danger" },
  { value: "FOOD_POISIONING", label: "Food poisioning" },
  { value: "OTHERS", label: "Others" },
];

const defaultEventDetail = {
  eventName: "No Event Name",
  eventType: EventType.OTHERS,
  visibility: Visibility.PRIVATE,
  tags: ["No Tag"],
  requireParticipantsMin: 1,
  requireParticipantsMax: 20,
  startDate: "2000-01-01",
  endDate: "2000-01-02",
  startTime: "08:00",
  endTime: "16:00",
  meetingType: MeetingType.ONSITE,
  location: "Chulalongkorn",
  website: "www.exmaple.com",
  pictures: [""],
  ownerName: "No Name",
};

const WebReport: React.FC<{}> = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);

  const onFormFinish = async () => {
    const data = new FormData();
    const { subject, description, problemType, attachments } =
      form.getFieldsValue(true);
    console.log(subject, description, problemType, attachments);
    /*Example
    attachments.fileList.forEach((picture: any) => {
      data.append("pictures", picture.originFileObj);
    });
    data.append("eventId", "1");
    await axios.post(CU_API + "events/uploadImage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
     */
    data.append("subject", subject);
    data.append("description", description);
    data.append("problemtype", problemType);
    if (attachments) {
      attachments.fileList.forEach((picture: any) => {
        data.append("pictures", picture.originFileObj);
      });
    }
    //await createEventReport(data);
    console.log(data);
  };

  const handleReportHistoryClick = () => {
    router.push("/report/reporthistory");
  };

  const subjectForm = <Input placeholder="Subject" style={{ width: "80%" }} />;
  const typeForm = <Select options={typeList} style={{ width: "80%" }} />;
  const descriptionForm = (
    <Input.TextArea
      placeholder="Description"
      style={{
        height: "20vh",
        maxHeight: "100%",
        width: "100%",
        resize: "none",
      }}
    />
  );

  const attachmentsForm = (
    <Upload.Dragger style={{ width: "80%" }}>
      <p className="ant-upload-hint">Add files or drop files here</p>
    </Upload.Dragger>
  );

  const buttonForm = (
    <ButtonContainer>
      <ButtonConfig
        type="default"
        htmlType="button"
        onClick={() => handleReportHistoryClick()}
      >
        Report history
      </ButtonConfig>
      <ButtonConfig type="primary" htmlType="submit">
        Submit
      </ButtonConfig>
    </ButtonContainer>
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.cu_pink}`,
        },
        components: {
          Button: {
            colorPrimary: `${theme.color.primary}`,
            colorPrimaryHover: `${theme.color.primaryHover}`,
          },
        },
      }}
    >
      <ReportContainer>
        <HeaderContainer>
          <Title className="ant-typography-title">Report Problem</Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            <LayoutContainer>
              <FormInputContainer form={form} onFinish={onFormFinish}>
                <FormInput
                  title="Subject"
                  name="subject"
                  isRequired={true}
                  rules={[{ required: true, message: "Please enter Subject" }]}
                >
                  {subjectForm}
                </FormInput>
                <FormInput
                  title="Description"
                  name="description"
                  isRequired={true}
                  rules={[
                    { required: true, message: "Please enter description" },
                  ]}
                >
                  {descriptionForm}
                </FormInput>
                <FormInput title="Attachments" name="attachments">
                  {attachmentsForm}
                </FormInput>
                <Form.Item>{buttonForm}</Form.Item>
              </FormInputContainer>
              {!isMobileScreen ? (
                <IconContainer>
                  <ReportIcon style={{ fontSize: "200px" }} />
                </IconContainer>
              ) : (
                <></>
              )}
            </LayoutContainer>
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ConfigProvider>
  );
};
const ReportContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  outline: 1px solid blue;
  width: 70%;
  ${theme.media.tablet} {
    width: 90%;
  }
  ${theme.media.mobile} {
    width: 100%;
  }
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  // outline: 1px solid red;
  font-size: 20px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: left;
  padding-top: 5vh;
`;

const LayoutContainer = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-content: start;
  width: 100%;
`;

const FormInputContainer = styled(Form)`
  align-items: center;
  justify-content: left;
  padding: 2.5vh;
  // outline: 1px solid red;
  width: 100%;
  min-width: 350px;
  ${theme.media.tablet} {
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 2;
    grid-row-end: span 2;
  }
  ${theme.media.mobile} {
    width: 100%;
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 3;
    grid-row-end: span 2;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 20vw;
  height: 30vh;
  // outline: 1px solid red;
  position: relative;
  place-self: start;
  ${theme.media.tablet} {
    width: max(20vh, 20vw);
    height: max(30vh, 30vw);
    max-width: 150px;
    max-height: 200px;
    place-self: center;
  }
  ${theme.media.mobile} {
    width: 20vh;
    height: 30vh;
    place-self: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 2vw;
  ${theme.media.tablet} {
    justify-content: center;
  }
`;

const ButtonConfig = styled(Button)`
  width: 180px;
`;
export default WebReport;
