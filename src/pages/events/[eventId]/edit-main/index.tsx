import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  Modal,
  Upload,
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Button,
  Layout,
  ConfigProvider,
  Row,
  Col,
  message,
  Image,
} from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { EventType, Visibility, MeetingType } from "@/types";
import useEventStore from "@/hooks/useEventStore";
import { Event } from "@/types";
import { CU_API } from "@/config";
import FormData from "form-data";
import events from "@/pages/api/events";
import PictureForm from "@/components/edit-event/PictureForm";

const { Content } = Layout;
const { Title, Text } = Typography;

const typeList = [
  { value: "RESTAURANT", label: "Restaurant" },
  { value: "CAFE", label: "Cafe" },
  { value: "BAR", label: "Bar" },
  { value: "SPORT", label: "Sport" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "CONCERT", label: "Concert" },
  { value: "PHOTO_TRIP", label: "Photo Trip" },
  { value: "BOARDGAME", label: "Boardgame" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "SPECIAL_DAY", label: "Special Day" },
  { value: "OTHERS", label: "Others" },
];

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";

const defaultEventDetail = {
  id: 0,
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
  ticketPrice: 0,
  website: "www.exmaple.com",
  pictures: ["pictures"],
  description: "Tell us something",
};

const EditEventMain: React.FC<{}> = ({}) => {
  const [event, setEventDetail] = useState<Event>(defaultEventDetail);
  const [onCancelEvent, setOnCancelEvent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isImageChange, setIsImageChange] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      events
        .getEventsByID(eventId.toString())
        .then((data) => {
          const thisEvent = {
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
            ticketPrice: data.ticketPrice,
            website: data.website,
            pictures: data.pictures,
            description: data.description,
          };
          setEventDetail(thisEvent);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [eventId]);

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        picture: `${CU_API}${event.pictures[event.pictures.length - 1]}`,
        eventName: event.eventName,
        eventType: event.eventType,
        visibility: event.visibility,
        tags: event.tags,
        requireParticipantsMin: event.requireParticipantsMin,
        requireParticipantsMax: event.requireParticipantsMax,
        requireParticipants: [
          event.requireParticipantsMin,
          event.requireParticipantsMax,
        ],
        date: [
          dayjs(event.startDate, dateFormat),
          dayjs(event.endDate, dateFormat),
        ],
        time: [
          dayjs(event.startTime, timeFormat),
          dayjs(event.endTime, timeFormat),
        ],
        ticketPrice: event.ticketPrice,
        meetingType: event.meetingType,
        location: event.location,
        website: event.website,
      });
    }
  }, [event]);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "SUCCESS",
      className: "custom-class",
    });
  };

  const onFormFinish = async () => {
    const formData: FormData = new FormData();

    if (eventId && event) {
      const id = eventId.toString();
      const {
        picture,
        eventName,
        eventType,
        visibility,
        tags,
        requireParticipants,
        date,
        time,
        ticketPrice,
        meetingType,
        location,
        website,
      } = form.getFieldsValue(true);
      const description = event.description;

      formData.append("eventName", eventName);
      formData.append("eventType", eventType);
      formData.append("visibility", visibility);
      formData.append("tags", tags);
      formData.append("requireParticipantsMin", requireParticipants[0]);
      formData.append("requireParticipantsMax", requireParticipants[1]);
      formData.append(
        "startDate",
        dayjs(date[0]).format("YYYY-MM-DD").toString()
      );
      formData.append(
        "endDate",
        dayjs(date[1]).format("YYYY-MM-DD").toString()
      );
      formData.append("startTime", dayjs(time[0]).format("HH:mm").toString());
      formData.append("endTime", dayjs(time[1]).format("HH:mm").toString());
      formData.append("ticketPrice", ticketPrice);
      formData.append("meetingType", meetingType);
      formData.append("location", location);
      if (website) formData.append("website", website);
      formData.append("description", description);
      if (isImageChange)
        formData.append("pictures", picture.file.originFileObj);

      events.updateEventDetail(id, formData);
    }
  };

  const handleBackClick = () => {
    router.push(`/events/${eventId}/detail`);
  };

  const handleSaveClick = () => {
    router.push(`/events/${eventId}/detail`);
  };

  const handleEditDescriptionClick = () => {
    router.push({
      pathname: `/events/${eventId}/edit-description`,
    });
  };

  const toggleCancelEventModal = () => {
    setOnCancelEvent(!onCancelEvent);
  };

  const handleCancelEventSureClick = () => {
    if (eventId) {
      events.cancelRefundEvent(eventId.toString());
      events.cancelEvent(eventId.toString());
      router.push(`/events/mine`);
    }
  };

  const handleCancelEventCancelClick = () => {
    setOnCancelEvent(false);
  };

  const eventNameForm = (
    <Input placeholder="Event Name" defaultValue={event.eventName} />
  );

  const typeForm = <Select defaultValue={event.eventType} options={typeList} />;

  const visibilityForm = (
    <Radio.Group
      defaultValue={event.visibility}
      buttonStyle="solid"
      style={{ width: "100%" }}
    >
      <Radio.Button
        value="PUBLIC"
        style={{ width: "50%", textAlign: "center" }}
      >
        Public
      </Radio.Button>
      <Radio.Button
        value="PRIVATE"
        style={{ width: "50%", textAlign: "center" }}
      >
        Private
      </Radio.Button>
    </Radio.Group>
  );

  const tagsForm = (
    <Select
      mode="tags"
      placeholder="Tags"
      defaultValue={event.tags}
      value={event.tags}
    />
  );

  const participantCountForm = (
    <FlexContainer>
      <FormInput title="Min" name="requireParticipantsMin">
        <Input
          placeholder="Min"
          style={{ width: "100%" }}
          defaultValue={event.requireParticipantsMin}
        />
      </FormInput>

      <FormInput title="Max" name="requireParticipantsMax">
        <Input
          placeholder="Max"
          style={{ width: "100%" }}
          defaultValue={event.requireParticipantsMax}
        />
      </FormInput>
    </FlexContainer>
  );

  const dateForm = (
    <FlexContainer>
      <Form.Item name="date" style={{ width: "100%" }}>
        <DatePicker.RangePicker
          style={{ height: "100%", width: "100%" }}
          format={dateFormat}
        />
      </Form.Item>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <Form.Item name="time" style={{ width: "100%" }}>
        <TimePicker.RangePicker
          style={{ height: "100%", width: "100%" }}
          format={timeFormat}
        />
      </Form.Item>
    </FlexContainer>
  );

  const currency = (
    <Form.Item name="currency" noStyle>
      <>&#3647;</>
    </Form.Item>
  );

  const ticketPriceForm = (
    <Input
      addonAfter={currency}
      placeholder="Ticket Price"
      defaultValue={event.ticketPrice}
    />
  );

  const meetingTypeForm = (
    <Radio.Group
      defaultValue={event.meetingType}
      buttonStyle="solid"
      style={{ width: "100%" }}
    >
      <Radio.Button
        value="ONSITE"
        style={{ width: "50%", textAlign: "center" }}
      >
        Onsite
      </Radio.Button>
      <Radio.Button
        value="ONLINE"
        style={{ width: "50%", textAlign: "center" }}
      >
        Online
      </Radio.Button>
    </Radio.Group>
  );

  const locationForm = (
    <Input placeholder="Location" defaultValue={event.location} />
  );

  const websiteForm = (
    <Input placeholder="Website" defaultValue={event.website} />
  );

  const title = (
    <CancelEventTitle>
      <Title>Want to cancel this event?</Title>
    </CancelEventTitle>
  );

  const content = (
    <CancelEventContent>
      <Text style={{ fontSize: 16 }}>
        If you cancel this event, ticket costs will be refunded back to the
        participants, are you sure?
      </Text>
    </CancelEventContent>
  );

  const renderButtonForm = (
    <NonFormButtonContainer>
      <ButtonConfig htmlType="button" onClick={handleEditDescriptionClick}>
        Edit Description
      </ButtonConfig>
      <ButtonConfig htmlType="button" onClick={toggleCancelEventModal} danger>
        Cancel Event
      </ButtonConfig>
      <Modal
        open={onCancelEvent}
        width={"40%"}
        centered={true}
        closable={true}
        bodyStyle={{ height: "50%", marginTop: "40" }}
        closeIcon={
          <FontAwesomeIcon
            onClick={toggleCancelEventModal}
            icon={faCircleXmark}
            size={"2x"}
          />
        }
        footer={null}
        title={title}
      >
        <ContentWrapper>{content}</ContentWrapper>
        <ModalButtonContainer>
          <ButtonConfig
            htmlType="button"
            type="primary"
            onClick={handleCancelEventCancelClick}
          >
            Back
          </ButtonConfig>
          <ButtonConfig
            htmlType="submit"
            onClick={handleCancelEventSureClick}
            danger
          >
            Sure
          </ButtonConfig>
        </ModalButtonContainer>
      </Modal>
    </NonFormButtonContainer>
  );

  const buttonForm = (
    <ButtonContainer>
      <ButtonConfig
        type="default"
        htmlType="button"
        onClick={() => handleBackClick()}
      >
        Cancel
      </ButtonConfig>
      <ButtonConfig
        type="primary"
        htmlType="submit"
        onClick={() => {
          success;
          handleSaveClick();
        }}
      >
        Submit
      </ButtonConfig>
    </ButtonContainer>
  );

  const onFinish = async () => {
    await onFormFinish();
    handleSaveClick();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <EditEventContainer>
        <Title className="ant-typography-title">Edit Event Detail</Title>
        <ContentContainer>
          <FormInputContainer form={form} onFinish={onFinish}>
            <Row>
              <LayoutContainer>
                <LeftContentContainer>
                  <Form.Item>
                    <PictureInputContainer>
                      <PictureForm
                        event={event}
                        isImageChange={isImageChange}
                        setIsImageChange={setIsImageChange}
                      />
                      {renderButtonForm}
                    </PictureInputContainer>
                  </Form.Item>
                </LeftContentContainer>
                <RightContentContainer>
                  <FormInput
                    title="Event Name"
                    name="eventName"
                    isRequired={true}
                    rules={[
                      { required: true, message: "Please Enter Event Name" },
                    ]}
                  >
                    {eventNameForm}
                  </FormInput>
                  <FormInput
                    title="Type"
                    name="eventType"
                    isRequired={true}
                    rules={[{ required: true, message: "Please Enter Type" }]}
                  >
                    {typeForm}
                  </FormInput>
                  <FormInput
                    title="Visibility"
                    name="visibility"
                    isRequired={true}
                    rules={[
                      { required: true, message: "Please Enter Visibility" },
                    ]}
                  >
                    {visibilityForm}
                  </FormInput>
                  <FormInput title="Tags" name="tags">
                    {tagsForm}
                  </FormInput>
                  <FormInput
                    title="Required Number of Participants"
                    name="requireParticipants"
                    isRequired={false}
                  >
                    {participantCountForm}
                  </FormInput>
                  <FormInput
                    title="Date"
                    name="date"
                    isRequired={true}
                    rules={[{ required: true, message: "Please Enter Date" }]}
                  >
                    {dateForm}
                  </FormInput>
                  <FormInput
                    title="Time"
                    name="time"
                    isRequired={true}
                    rules={[{ required: true, message: "Please Enter Time" }]}
                  >
                    {timeForm}
                  </FormInput>
                  <FormInput
                    title="Ticket Price"
                    name="ticketPrice"
                    isRequired={false}
                  >
                    {ticketPriceForm}
                  </FormInput>
                  <FormInput
                    title="Meeting Type"
                    name="meetingType"
                    isRequired={true}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Meeting Form",
                      },
                    ]}
                  >
                    {meetingTypeForm}
                  </FormInput>
                  <FormInput
                    title="Location"
                    name="location"
                    isRequired={true}
                    rules={[
                      { required: true, message: "Please Enter Location" },
                    ]}
                  >
                    {locationForm}
                  </FormInput>
                  <FormInput title="Website" name="website">
                    {websiteForm}
                  </FormInput>
                </RightContentContainer>
              </LayoutContainer>
            </Row>
            <Row>
              <Form.Item>
                {contextHolder}
                {buttonForm}
              </Form.Item>
            </Row>
          </FormInputContainer>
        </ContentContainer>
      </EditEventContainer>
    </ConfigProvider>
  );
};

const EditEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.5vh 5vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInputContainer = styled(Form)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
`;

const LeftContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  ${theme.media.tablet} {
    width: 100%;
  }
`;

const RightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${theme.media.tablet} {
    width: 100%;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90%;
  width: 100%;
  gap: 20px;
  ${theme.media.mobile} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 5px;
  }
`;

const PictureInputContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

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
`;

const ButtonConfig = styled(Button)`
  // width: 100%;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin-top: 40vh;
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
`;

const CancelEventTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CancelEventContent = styled.h2`
  font-size: 24px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default EditEventMain;
