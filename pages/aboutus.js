import HeaderContainer from "@/component/header";
import { Col, Row } from "antd";
import React from "react";

export default function AboutUsPage() {
  return (
    <HeaderContainer>
      <Row justify="center">
        <Col span={20}>
          <br />
          <center>
            <h1
              style={{
                fontFamily:
                  "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                color: "rgb(255, 22, 139)",
                fontSize: "40px",
              }}
            >
              About Chef Food
            </h1>
            <br />
            <p style={{ fontSize: "20px" }}>
              “Food for us comes from our relatives, whether they have wings or
              fins or roots.
              <br />
              That is how we consider food. Food has a culture. It has a
              history.
              <br />
              It has a story. It has relationships.”
            </p>
          </center>
          <br />
          <br />
          <div style={{ fontSize: "20px" }}>
            <ul>
              <li>First, we eat. Then, we do everything else.</li>
              <li>I'm not drooling; you are!</li>
              <li>
                Yes it just me, or does this meal look more scrumptious because
                I'm on a diet?
              </li>
              <li>
                I like people who love to eat. They're the best kind of people
                in the world.
              </li>
              <li>Live, love, eat.</li>
              <li>Made with love.</li>
              <li>To live a full life, you have to fill your stomach first.</li>
              <li>might be my soulmate.</li>
              <li>All I want for Christmas is ... food.</li>
              <li>Never eat more than you can lift.</li>
            </ul>
          </div>
          <br />
          <p
            style={{
              fontSize: "large",
              textAlign: "center",
              fontStyle: "italic",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            "Food is not only a source of nourishment for our bodies, but also a
            way to connect with others and experience joy. By choosing whole,
            nutritious foods and enjoying them in moderation, we can fuel our
            bodies and minds while still savoring the pleasures of eating. Let's
            celebrate the diversity and abundance of foods available to us and
            embrace the idea that food can be both delicious and good for us!"
          </p>
        </Col>
      </Row>
    </HeaderContainer>
  );
}
