import React, { useState } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  LoginOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import * as logo from "../public/logo.png";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

export default function HeaderContainer({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          minHeight: "100vh",
          left: 0,
          right: 0,
          bottom: 0,
        }}
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
      >
        <div>
          {collapsed ? (
            <div style={{ height: "10px" }} />
          ) : (
            <Image
              src={logo}
              height={190}
              property="true"
              width={170}
              alt="Food Blog logo"
              priority
            />
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: <Link href="/">Home</Link>,
            },
            {
              key: "2",
              icon: <TeamOutlined />,
              label: <Link href="/aboutus">About Us</Link>,
            },
            {
              key: "3",
              icon: <CustomerServiceOutlined />,
              label: <Link href="/contactus">Contact Us</Link>,
            },
            {
              key: "4",
              icon: <LoginOutlined />,
              label: <Link href="/login">Login In</Link>,
            },
            {
              key: "5",
              icon: <UserOutlined />,
              label: <Link href="/profile">Profile</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            margin: "5px",
            background: colorBgContainer,
          }}
        ></Header>
        <Content
          style={{
            margin: "5px 5px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
