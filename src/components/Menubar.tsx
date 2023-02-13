import React from "react";
import styled from "styled-components";
import ButonJoinLog from "./ButtonJoinLog";
import theme from "@/utils/theme";
import Burger from "./Burger";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    color: white;
    width: 80%;
    height: 150px;
`;

const Li = styled.li`
    margin: 0 45px;
    display: flex;
    font-size: 48px;
    align-items: center;
    height: 150px;
`;
const Li2 = styled.li`
    margin: 0 20px;
    padding-top: 19px;
    display: flex;
    font-size: 24px;
    align-items: center;
    height: 150px;
    ${theme.media.tablet} {
        display: none;
    }
`;

const CU = styled.div`
    color: #f96491;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 150px;
`;

const Butcon = styled.div`
    display: flex;
    justify-content: center;
    ${theme.media.tablet} {
        display: none;
    }
`;

export default function Menubar() {
    return (
        <Container>
            <Ul>
                <b>
                    <Li>
                        <CU>CU</CU>2Gether
                    </Li>
                </b>
                <Li2>Product</Li2>
                <Li2>Learn</Li2>
                <Li2>Support</Li2>
            </Ul>
            {/* <Butcon> */}
            <ButonJoinLog />
            {/* </Butcon> */}
            <Burger />
        </Container>
    );
}
