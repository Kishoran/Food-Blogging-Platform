import HeaderContainer from "@/component/header";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";

export default function Contactus() {
  return (
    <HeaderContainer>
      <Row justify="center">
        <Col>
          <br />
          <br />
          <h1 style={{ fontSize: "25px" }}>Contact Us</h1>
          <br />
          <p style={{ textAlign: "center" }}>
            Thankyou for co-operating with us...!
            <br />
            Please visit again
          </p>
          <br />
          <p>
            <b>Site :</b> Chef Food
          </p>
          <br />
          <p>
            <b>Address :</b> Chennai, TamilNadu
          </p>
          <br />
          <p>
            <b>Phone No :</b> +1 984-456-765
          </p>
          <br />
          <p>
            <b>Hours :</b> 6:00AM - 8:00PM
          </p>
          <br />
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Col style={{ width: 50 }}>
              <Link href={"/"} passHref>
                <FacebookOutlined />
              </Link>
            </Col>
            <Col style={{ width: 50 }}>
              <Link href={"/"} passHref>
                <InstagramOutlined />
              </Link>
            </Col>
            <Col style={{ width: 50 }}>
              <Link href={"/"} passHref>
                <TwitterOutlined />
              </Link>
            </Col>
            <Col style={{ width: 50 }}>
              <Link href={"/"} passHref>
                <LinkedinOutlined />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </HeaderContainer>
  );
}
