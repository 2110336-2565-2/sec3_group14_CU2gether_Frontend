import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Steps, Button } from "antd";

import BasicsContent from "@/components/create-event/BasicsContent";
import LocationContent from "@/components/create-event/LocationContent";
import DescriptionContent from "@/components/create-event/DescriptionContent";

const createEvent: React.FC<{}> = ({}) => {
  const [current, useCurrent] = useState(0);

  const clickclick = () => {
    useCurrent(current + 1);
  };

  const content = [
    <BasicsContent />,
    <LocationContent />,
    <DescriptionContent />,
  ];
  return (
    <>
      <Steps
        current={current}
        items={[
          { title: "Basics" },
          { title: "Location" },
          { title: "Description" },
        ]}
      />
      <>{content[current]}</>
      <Button onClick={clickclick} />
      <Button htmlType="submit">Submittt</Button>
    </>
  );
};

export default createEvent;
