import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";
import { Modal, Upload, Form, Input, Select, Radio, DatePicker, TimePicker, Button, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import FormInput from "../basic-components/FormInput";
import { getEventByName, updateEventDetail, cancelEvent } from "api/event";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import PictureForm from "./PictureForm";

const FormInputContainer = styled(Layout)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.white};
`;

const NonFormInputContainer = styled(Layout)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 65%;
  background-color: ${theme.color.white};
`;

const EndFormContainer = styled(Layout)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  background-color: ${theme.color.white};
`

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  gap: 2vw;
`;

const NonFormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
  flex-direction: column;
`

const ButtonConfig = styled(Button)`
    width: 180px;
    // height: 44px;
    // font-size: 20px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin-top: 40vh;
`

const ContentWrapper = styled.div`
  margin-top: 10px;
`

const CancelEventTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;  
`
const CancelEventContent = styled.h2`
  font-size: 24px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const typeList = [
  { value: "No Type", label: "No Type"},
  { value: "Concert", label: "Concert" },
  { value: "Education", label: "Education" },
  { value: "Festival", label: "Festival" },
  { value: "Market", label: "Market" },
];

const tagList = [
  { value: "eiei1", label: "eiei1" },
  { value: "eiei2", label: "eiei2" },
  { value: "eiei3", label: "eiei3" },
  { value: "eiei4", label: "eiei4" },
];

const EditEvent: React.FC<{}> = ({}) => {
  const [eventDetail, setEventDetail] = useState({
    eventName: "No Event Name",
    eventType: "No Type",
    visibility: "public",
    tags: "Animal",
    requireParticipantsMin: 0,
    requireParticipantsMax: 127,
    startDate: dayjs('13:30:56', 'HH:mm:ss'),
    endDate: dayjs('13:30:56', 'HH:mm:ss'),
    startTime: dayjs('13:30:56', 'HH:mm:ss'),
    endTime: dayjs('13:30:56', 'HH:mm:ss'),
    meetingType: "onsite",
    location: "Somewhere On Earth",
    website: "www.exmaple.com",
  });

  const [onCancelEvent, setOnCancelEvent] = useState(false); 
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '0',
      name: 'poster.png',
      status: 'done',
      url: '/orangutan_show.png',
    },
  ]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  setFileList(newFileList);

  const [form] = Form.useForm();

  useEffect(() => {
    getEventByName('orange')
    .then((data) => {
      const newEvent = {
        eventName: data.eventName,
        eventType: data.eventType,
        visibility: data.visibility,
        tags: data.tags,
        requireParticipantsMin: data.requireParticipantsMin,
        requireParticipantsMax: data.requireParticipantsMax,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        meetingType: data.meetingType,
        location: data.location,
        website: data.website,
      };
      setEventDetail(newEvent);
      console.log(newEvent)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      "event-name": eventDetail.eventName,
      "event-type": eventDetail.eventType,
      "visibility": eventDetail.visibility,
      "tags": eventDetail.tags,
      "minimum": eventDetail.requireParticipantsMin,
      "maximum": eventDetail.requireParticipantsMax,
      "start-date": dayjs(eventDetail.startDate),
      "end-date": dayjs(eventDetail.endDate),
      "date": [dayjs(eventDetail.startDate), dayjs(eventDetail.endDate)],
      "start-time": dayjs(eventDetail.startTime),
      "end-time": dayjs(eventDetail.endTime),
      "meeting-type": eventDetail.meetingType,
      "location": eventDetail.location,
      "website": eventDetail.website,
    })
  })

  const router = useRouter();

  const handleSaveClick = () => {
    updateEventDetail(
      eventDetail.eventName, 
      eventDetail.eventType, 
      eventDetail.visibility, 
      eventDetail.tags, 
      eventDetail.requireParticipantsMin,
      eventDetail.requireParticipantsMax, 
      eventDetail.startDate,
      eventDetail.endDate, 
      eventDetail.startTime,
      eventDetail.endTime, 
      eventDetail.meetingType, 
      eventDetail.location, 
      eventDetail.website,
      );
  }

  const handleCancelClick = () => {
    router.push('/');
  }

  const handleEditDescriptionClick = () => {
    router.push('/editEvent/description',undefined,{shallow:true});
  }

  const toggleCancelEventModal = () => {
    setOnCancelEvent(!onCancelEvent);
  };

  const handleCancelEventSureClick = () => {
    cancelEvent(eventDetail.eventName);
  }

  const handleCancelEventCancelClick = () => {
    setOnCancelEvent(false);
  }

  const eventNameForm = (
    <Input 
    placeholder="Event Name" 
    defaultValue={eventDetail.eventName}
    />
  ); 

  const typeForm = (
    <Select
      defaultValue={eventDetail.eventType}
      options={typeList}
    />
  );

  const visibilityForm = (
    <Radio.Group defaultValue={eventDetail.visibility} buttonStyle="solid" style={{width: '100%'}}>
      <Radio.Button value="PUBLIC" style={{ width: '50%', textAlign: "center" }}>
        Public
      </Radio.Button>
      <Radio.Button value="PRIVATE" style={{ width: '50%', textAlign: "center" }}>
        Private
      </Radio.Button>
    </Radio.Group>
  );

  const tagsForm = (
    <Select
      mode="tags"
      placeholder="Tags"
      defaultValue={eventDetail.tags}
      value={eventDetail.tags}
      options={tagList}
    />      
  );

  const participantCountForm = (
    <FlexContainer>
      <FormInput title="Min" name="minimum" >
        <Input placeholder="Min" style={{ width: '50%'}} defaultValue={eventDetail.requireParticipantsMin}/>
      </FormInput>

      <FormInput title="Max" name="maximum" >
        <Input placeholder="Max" style={{ width: '50%'}} defaultValue={eventDetail.requireParticipantsMax}/>
      </FormInput>
    </FlexContainer>
  );

  const dateForm = (
    <FlexContainer>
      <DatePicker.RangePicker 
      defaultValue={[eventDetail.startDate, eventDetail.endDate]}
      style={{ height: '100%', width: '100%' }}/>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <TimePicker.RangePicker 
      defaultValue={[eventDetail.startTime, eventDetail.endTime]}
      format="HH:mm"
      style={{ height: '100%', width: '100%' }}/>
    </FlexContainer>
  );

  const meetingTypeForm = (
    <FlexContainer>
      <Radio.Group defaultValue={eventDetail.meetingType} buttonStyle="solid" style={{ width:'100%'}}>
        <Radio.Button value="onsite" style={{ width: '50%', textAlign: "center" }}>
          Onsite
        </Radio.Button>
        <Radio.Button value="online" style={{ width: '50%', textAlign: "center" }}>
          Online
        </Radio.Button>
      </Radio.Group>      
    </FlexContainer>
  );

  const locationForm = (
    <Input placeholder="Location" defaultValue={eventDetail.location}/>
  );

  const websiteForm = (
    <Input placeholder="Website" defaultValue={eventDetail.website}/>
  );

  const buttonForm = (
    <ButtonContainer>
        <ButtonConfig htmlType="button" onClick={handleCancelClick}>
          Cancel
        </ButtonConfig>
        <ButtonConfig htmlType="submit" type="primary" onClick={handleSaveClick}>
          Submit
        </ButtonConfig>
    </ButtonContainer>
  );

  const title = (
    <CancelEventTitle>
      Want to cancel event?
    </CancelEventTitle>
  );

  const content = (
    <CancelEventContent>
      If you cancel this event, I will kill you!!!
    </CancelEventContent>
  );

  const renderButtonForm = (
    <NonFormButtonContainer>
      <ButtonConfig 
      htmlType="button" 
      onClick={handleEditDescriptionClick}>
        Edit Description
      </ButtonConfig>
      <ButtonConfig 
      htmlType="button"
      onClick={toggleCancelEventModal}>
        Cancel Event
      </ButtonConfig>
      <Modal
      open={onCancelEvent}
      width={600}
      centered={true}
      closable={true}
      bodyStyle={{minHeight:500, marginTop: 40}}
      closeIcon={
        <FontAwesomeIcon
          onClick={toggleCancelEventModal}
          icon={faCircleXmark}
          size={"2x"}
        />
      }
      footer={null}
      title={title}>
        <ContentWrapper>
            {content}
        </ContentWrapper>
        <ModalButtonContainer>
          <ButtonConfig 
          htmlType='button' 
          onClick={handleCancelEventCancelClick}>
            Cancel
          </ButtonConfig>
          <ButtonConfig 
          htmlType='submit' 
          type='primary'
          onClick={handleCancelEventSureClick}>
            Sure
          </ButtonConfig>
        </ModalButtonContainer>
      </Modal>
    </NonFormButtonContainer>
  );

  const editImageForm = (
    <Upload.Dragger 
    listType="picture-card"
    fileList={fileList}
    onChange={handleChange} 
    style={{alignItems:'center',justifyContent:'center'}}>
    </Upload.Dragger>  
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
          colorPrimaryHover: `${theme.color.primaryHover}`
        }
      }
    }}>
    <FormInputContainer >
      <Form form={form} >
        <FormInput title="Event Name" name="event-name" isRequired={false}>
          {eventNameForm}
        </FormInput>

        <FormInput title="Type" name="event-type" isRequired={false}>
          {typeForm}
        </FormInput>

        <FormInput title="Visibility" name="visibility" isRequired={false}>
          {visibilityForm}
        </FormInput>

        <FormInput title="Tags" name="tags">
          {tagsForm}
        </FormInput>

        <FormInput title="Required Number of Participants" name="participant-count" isRequired={false}>
          {participantCountForm}
        </FormInput>

        <FormInput title="Date" name="date" isRequired={false}>
          {dateForm}
        </FormInput>

        <FormInput title="Time" name="time" isRequired={false}>
          {timeForm}
        </FormInput>

        <FormInput title="Meeting Type" name="meeting-type" isRequired={false}>
          {meetingTypeForm}
        </FormInput>

        <FormInput title="Location" name="location" isRequired={false}>
          {locationForm}
        </FormInput>

        <FormInput title="Website" name="website">
          {websiteForm}
        </FormInput>
      </Form>    
    </FormInputContainer>
    <NonFormInputContainer>
      {/* {editImageForm} */}
      <PictureForm />
      {renderButtonForm} 
    </NonFormInputContainer>
    <EndFormContainer>
      {buttonForm}
    </EndFormContainer> 
    </ConfigProvider>
  );
};

export default EditEvent;