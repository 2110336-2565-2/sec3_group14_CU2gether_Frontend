import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, Modal, Upload, Form, Input, Select, Radio, DatePicker, TimePicker, Button, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { EventType, Visibility, MeetingType } from "@/types";
import useEventStore from "@/hooks/useEventStore";
import event from "api/event";

import PictureForm from "./PictureForm";
import { format } from "path";

const { Title, Text} = Typography;
 
const LayoutContainer = styled(Layout)`
  justify-content: center;
  flex-direction: row;
  width: 100%;
  ${theme.media.tablet} {
    flex-direction: column;
  }
`

const FormInputContainer = styled(Form)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  padding: 2.5vh;
`;

const NonFormInputContainer = styled(Layout)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 50%;
`;

const EndFormContainer = styled(Layout)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  gap: 2vw;
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
  { value: "RESTAURANT", label: "Restaurant"},
  { value: "CAFE", label: "Cafe" },
  { value: "BAR", label: "Bar" },
  { value: "SPORT", label: "Sport" },
  { value: "VOLUNTEER", label: "Volunteer" },
];

const tagList = [
  { value: "eiei1", label: "eiei1" },
  { value: "eiei2", label: "eiei2" },
  { value: "eiei3", label: "eiei3" },
  { value: "eiei4", label: "eiei4" },
];

export type eventDetailParams = {
  id: string,
  eventName?: string,
  eventType?: EventType,
  visibility?: Visibility,
  tags?: string[],
  requireParticipantsMin?: number,
  requireParticipantsMax?: number,
  startDate?: string,
  endDate?: string,
  startTime?: string,
  endTime?: string,
  meetingType?: MeetingType,
  location?: string,
  website?: string,
};

const EditEvent: React.FC<{}> = ({}) => {
  const [eventDetail, setEventDetail] = useState({
    id: "0",
    eventName: "No Event Name",
    eventType: EventType.OTHERS,
    visibility: Visibility.PRIVATE,
    tags: ["No Tag"],
    requireParticipantsMin: 1,
    requireParticipantsMax: 20,
    startDate: '2000-01-01',
    endDate: '2000-01-02',
    startTime: '08:00',
    endTime: '16:00',
    meetingType: MeetingType.ONSITE,
    location: "Chulalongkorn",
    website: "www.exmaple.com",
  });

  // const [eventDetail, setEventDetail] = useState<eventDetailParams>({});
  // const { event, fetchEvent } = useEventStore();
  const [onCancelEvent, setOnCancelEvent] = useState<boolean>(false); 
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '0',
      name: 'poster.png',
      status: 'done',
      url: '/orangutan_show.png',
    },
  ]);

  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  setFileList(newFileList);

  const [form] = Form.useForm();
  const router = useRouter();
  const { ename } = router.query;
  
  useEffect(() => {
    event.getEventByID("3")
    .then((data) => {
      const newEvent = {
        id: data.id,
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchEvent("2");
  //     } catch (e) {}
  //   };
  //   fetchData();
  //   // setEventDetail(e);
  // }, []);

  
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm';

  useEffect(() => {
    form.setFieldsValue({
      "eventName": eventDetail.eventName,
      "eventType": eventDetail.eventType,
      "visibility": eventDetail.visibility,
      "tags": eventDetail.tags,
      "requireParticipantsMin": eventDetail.requireParticipantsMin,
      "requireParticipantsMax": eventDetail.requireParticipantsMax,
      "requireParticipants": [eventDetail.requireParticipantsMin, eventDetail.requireParticipantsMax],
      "date": [dayjs(eventDetail.startDate, dateFormat), dayjs(eventDetail.endDate, dateFormat)],
      "time": [dayjs(eventDetail.startTime, timeFormat), dayjs(eventDetail.endTime, timeFormat)],
      "meetingType": eventDetail.meetingType,
      "location": eventDetail.location,
      "website": eventDetail.website,
    })
  });

  const onFormFinish = async (values: any) => {
    console.log(values);
    const id = eventDetail.id;
    const {      
      eventName, 
      eventType, 
      visibility, 
      tags, 
      requireParticipants,
      date,
      time, 
      meetingType, 
      location, 
      website,} = values;
      event.updateEventDetail(
      id,
      eventName, 
      eventType, 
      visibility, 
      tags, 
      requireParticipants[0],
      requireParticipants[1], 
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"), 
      time[0].format("HH:mm"),
      time[1].format("HH:mm"), 
      meetingType, 
      location, 
      website,
    )
  }

  const handleCancelClick = () => {
    router.push('/');
  }

  const handleEditDescriptionClick = () => {
    router.push('/editEvent/description');
  }

  const toggleCancelEventModal = () => {
    setOnCancelEvent(!onCancelEvent);
  };

  const handleCancelEventSureClick = () => {
    event.cancelEvent(eventDetail.id);
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
      <FormInput title="Min" name="requireParticipantsMin" >
        <Input placeholder="Min" style={{ width: '50%'}} defaultValue={eventDetail.requireParticipantsMin}/>
      </FormInput>

      <FormInput title="Max" name="requireParticipantsMax" >
        <Input placeholder="Max" style={{ width: '50%'}} defaultValue={eventDetail.requireParticipantsMax}/>
      </FormInput>
    </FlexContainer>
  );

  const dateForm = (
    <FlexContainer>
      <Form.Item name="date" style={{width: '100%'}}>
        <DatePicker.RangePicker 
        style={{ height: '100%', width: '100%' }}
        format={dateFormat}
        />
      </Form.Item>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <Form.Item name="time" style={{width: '100%'}}>
        <TimePicker.RangePicker 
        style={{ height: '100%', width: '100%' }}
        format={timeFormat}
        />
      </Form.Item>
    </FlexContainer>
  );

  const meetingTypeForm = (
    <Radio.Group defaultValue={eventDetail.meetingType} buttonStyle="solid" style={{ width:'100%'}}>
      <Radio.Button value="ONSITE" style={{ width: '50%', textAlign: "center" }}>
        Onsite
      </Radio.Button>
      <Radio.Button value="ONLINE" style={{ width: '50%', textAlign: "center" }}>
        Online
      </Radio.Button>
    </Radio.Group>   
  )
  const locationForm = (
    <Input placeholder="Location" defaultValue={eventDetail.location}/>
  );

  const websiteForm = (
    <Input placeholder="Website" defaultValue={eventDetail.website}/>
  );

  const title = (
    <CancelEventTitle>
      <Title>Want to cancel event?</Title>
    </CancelEventTitle>
  );

  const content = (
    <CancelEventContent>
      <Text style={{fontSize: 20}}>
        If you cancel this event, I will kill you!!!
      </Text>
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
      width={'50vw'}
      centered={true}
      closable={true}
      bodyStyle={{minHeight:'50%', marginTop: '40'}}
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

  const buttonForm = (
    <ButtonContainer>
        <ButtonConfig type="default" htmlType="button" onClick={() => handleCancelClick()}>
          Cancel
        </ButtonConfig>
        <ButtonConfig type="primary" htmlType="submit" >
          Submit
        </ButtonConfig>
    </ButtonContainer>
  );

  const editImageForm = (
    <Upload.Dragger 
    listType="picture-card"
    fileList={fileList}
    onChange={handleImageChange} 
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
    <LayoutContainer>
      <NonFormInputContainer>
        <PictureForm />
        {renderButtonForm} 
      </NonFormInputContainer>
      <FormInputContainer form={form} onFinish={onFormFinish}>
        <FormInput title="Event Name" name="eventName" isRequired={false}>
          {eventNameForm}
        </FormInput>
        <FormInput title="Type" name="eventType" isRequired={false}>
          {typeForm}
        </FormInput>
        <FormInput title="Visibility" name="visibility" isRequired={false}>
          {visibilityForm}
        </FormInput>
        <FormInput title="Tags" name="tags">
          {tagsForm}
        </FormInput>
        <FormInput title="Required Number of Participants" name="requireParticipants" isRequired={false}>
          {participantCountForm}
        </FormInput>
        <FormInput title="Date" name="date" isRequired={false}>
          {dateForm}
        </FormInput>
        <FormInput title="Time" name="time" isRequired={false}>
          {timeForm}
        </FormInput>
        <FormInput title="Meeting Type" name="meetingType" isRequired={false}>
          {meetingTypeForm}
        </FormInput>
        <FormInput title="Location" name="location" isRequired={false}>
          {locationForm}
        </FormInput>
        <FormInput title="Website" name="website">
          {websiteForm}
        </FormInput>
        <Form.Item>
          {buttonForm}
        </Form.Item>    
      </FormInputContainer>
    </LayoutContainer>
    {/* <EndFormContainer> 
    </EndFormContainer>  */}
    </ConfigProvider>
  );
};

export default EditEvent;