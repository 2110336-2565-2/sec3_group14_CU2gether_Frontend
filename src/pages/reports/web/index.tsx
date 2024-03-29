import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, Form, Input, Button, Layout, Upload } from "antd";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import { useRouter } from "next/router";
import FormData from "form-data";
import ReportIcon from "@mui/icons-material/Report";
import { useMediaQuery } from "react-responsive";
import ReportProvider from "@/components/report/Provider";
import { ContainedButton, OutlinedButton } from "@/common/button";
import useReportStore from "@/hooks/useReportStore";
const { Content } = Layout;
const { Title } = Typography;

const WebReport: React.FC<{}> = ({}) => {
  const { createWebReport } = useReportStore();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);

  const onFormFinish = async () => {
    const data = new FormData();
    const { subject, description, attachments } = form.getFieldsValue(true);
    data.append("topic", subject);
    data.append("description", description);
    if (attachments && attachments.fileList) {
      attachments.fileList.forEach((picture: any) => {
        data.append("imageUrl", picture.originFileObj);
      });
    }
    await createWebReport(data);
    router.back();
  };

  const handleReportHistoryClick = () => {
    router.push("/reports");
  };

  const subjectForm = <Input placeholder="Subject" style={{ width: "80%" }} />;
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
      <Typography.Paragraph>Add files or drop files here</Typography.Paragraph>
    </Upload.Dragger>
  );

  const buttonForm = (
    <ButtonContainer>
      <OutlinedButton
        type="default"
        htmlType="button"
        onClick={handleReportHistoryClick}
        text="Report History"
      />
      <ContainedButton text="Submit" htmlType="submit" />
    </ButtonContainer>
  );
  return (
    <ReportProvider>
      <ReportContainer>
        <HeaderContainer>
          <Title>Report Problem</Title>
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
              {!isMobileScreen && (
                <IconContainer>
                  <ReportIcon style={{ fontSize: "200px" }} />
                </IconContainer>
              )}
            </LayoutContainer>
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ReportProvider>
  );
};
const ReportContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  // outline: 1px solid blue;
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
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
  ${theme.media.tablet} {
    justify-content: center;
  }
`;

const ButtonConfig = styled(Button)`
  width: 180px;
`;
export default WebReport;
