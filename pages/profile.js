import HeaderContainer from "@/component/header";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Popconfirm, Row, message } from "antd";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const secret = process.env.JWTSECRET;
const cookie_name = process.env.COOKIE_NAME;
export async function getServerSideProps({ req }) {
  try {
    const jwt = req.cookies[cookie_name];
    //check if jwt is valid
    let jwtDecoded = verify(jwt, secret);

    return {
      props: {
        user: jwtDecoded.user,
      },
    };
  } catch (error) {
    //if jwt is invalid redirect to login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

const { Meta } = Card;

export default function ProfilePage({ user }) {
  let [recipe, setRecipe] = useState([]);
  let { name, email } = user;
  let [len, setLen] = useState(0);

  async function downloadRecipe() {
    try {
      recipe = await fetch("/api/user/getrecipe_usr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      recipe = await recipe.json();
      if (recipe.status) {
        setRecipe([...recipe.data]);
        let l = recipe.data.length;
        setLen(l);
      }
    } catch (error) {}
  }

  useEffect(() => {
    downloadRecipe();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      let response = await fetch("/api/recipe/delete_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      response = await response.json();
      if (response.status) {
        message.success(response.message);
        downloadRecipe();
      }
    } catch (error) {}
  };
  return (
    <HeaderContainer>
      <Row justify="center">
        <Col span={20}>
          <Row>
            <Col span={12}>
              <br />
              <br />
              <br />
              <center>
                <Avatar size={150} icon={<UserOutlined />} />
              </center>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <br />
                  <br />
                  <br />
                  <p>Hello Chef {name}</p>
                </Col>
                <Col span={24}>
                  <br />
                  <p>Interested in Sharing Your Recipe?</p>
                  <p>
                    Create your Recipe{" "}
                    <Link href={"/recipe/create"} passHref>
                      <Button
                        icon={<ReconciliationOutlined />}
                        type="text"
                        size="large"
                      />
                    </Link>
                  </p>
                </Col>
                <Col span={24}>
                  <p>{len} Recipes</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={20}>
          <br />
          <hr />
          <br />
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>Your Recipes</p>
          <br />
          <Row justify="space-around">
            {recipe.map((item, id) => {
              return (
                <Col style={{ marginTop: "15px" }} key={id}>
                  <Card
                    hoverable
                    style={{ width: 260, minHeight: 500 }}
                    cover={<img alt="example" height={350} src={item.url} />}
                    actions={[
                      <EditOutlined key="edit" />,
                      <Popconfirm
                        title="Delete the comment"
                        description="Are you sure to delete this comment?"
                        onConfirm={() => {
                          deleteRecipe(item.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button icon={<DeleteOutlined />} type="text" />
                      </Popconfirm>,
                    ]}
                  >
                    {" "}
                    <Link
                      href={`/recipe/${encodeURIComponent(item.id)}`}
                      passHref
                    >
                      <Meta
                        title={item.title}
                        description={item.description.substring(0, 100)}
                      />
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <br />
    </HeaderContainer>
  );
}
