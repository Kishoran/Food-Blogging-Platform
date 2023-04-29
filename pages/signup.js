import React from "react";
import { Card, Col, Form, Row, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (val) => {
    let { name, email, password, cpassword } = val;
    if (password != cpassword) {
      message.error("Incorrect Confimation Password");
      return;
    }
    let response = await fetch("/api/create_usr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status) {
      //message.success(response.message);
      router.push("/login");
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
                  <h2>Sign Up</h2>
                </center>
              </div>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="UserName" />
                </Form.Item>

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

                <Form.Item
                  name="cpassword"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input
                    type="password"
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                  />
                </Form.Item>
                <Form.Item>
                  <center>
                    <Button htmlType="submit">Sign Up</Button>
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
                <h2 style={{ color: "blueviolet" }}>Login</h2>
                <p>Already have a account? Continue Here</p>
                <Link href={"/login"} passHref>
                  <Button>Login</Button>
                </Link>
              </center>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
