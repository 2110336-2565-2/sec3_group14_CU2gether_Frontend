import background from "../../../public/background.svg";
import styled from "styled-components";
import theme from "@/utils/theme";
import Image from "next/image";
const PictureContent: React.FC<{}> = ({}) => {
  return (
    <Sider>
      <Image src={background} alt={"asdf"} fill objectFit="cover" />
    </Sider>
  );
};
const Sider = styled.div`
  background-color: #fff;
  color: #fff;
  width: 25%;
  height: 100%;
  text-align: center;
  position: relative;
  ${theme.media.tablet} {
    width: 100%;
  }
`;
export default PictureContent;
