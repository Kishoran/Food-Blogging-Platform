import React from "react";
import { Card, Col, Form, Row, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (val) => {
    let { email, password } = val;
    let response = await fetch("/api/user/login_usr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();

    if (response.status) {
      message.success(response.message);
      router.push("/");
    } else {
      message.error(response.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Card style={{ height: "365px", width: "700px" }}>
        <Row justify="center" style={{ minHeight: "90vh" }}>
          <Col span={12}>
            <Card style={{ height: "315px", border: "none" }}>
              <div>
                <center>
                  <h2>Log In</h2>
                  <p>Hey you Welcome back!</p>
                </center>
              </div>
              <br />
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input
                    type="password"
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <center>
                    <Button htmlType="submit">Login</Button>
                  </center>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{
                height: "315px",
                border: "none",
                borderRadius: "0",
                borderWidth: "1px",
                borderLeftStyle: "solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <center>
                <h2 style={{ color: "blueviolet" }}>Create A New Account</h2>
                <p>Not a member yet? Create your account here!</p>
                <Link href={"/signup"} passHref>
                  <Button>Sign Up</Button>
                </Link>
              </center>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
