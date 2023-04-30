import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message } from "antd";
import { verify } from "jsonwebtoken";
import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import HeaderContainer from "@/component/header";

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

export default function CreateRecipePage({ user }) {
  let { name, email } = user;
  let [imageupload, setImageupload] = useState(false);
  let [url, setURL] = useState("");
  const handleUpload = (result, widget) => {
    setURL(result.info.url);
    setImageupload(true);
  };
  const handleError = (error, widget) => {
    setImageupload(false);
    console.log(error);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };

  const onFinish = async (val) => {
    if (url) {
      try {
        let response = await fetch("/api/recipe/create_recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, ...val, url }),
        });
        response = await response.json();
        if (response.status) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        console.log(val);
      } catch (error) {}
    } else {
      message.info("Upload Picture");
    }
  };

  return (
    <HeaderContainer>
      <Row justify="center">
        <Col span={20}>
          <br />
          <center>
            <h1>Create Your Recipe</h1>
          </center>
        </Col>
        <Col span={20}>
          <br />
          <div>
            <Form
              {...formItemLayoutWithOutLabel}
              onFinish={onFinish}
              // style={{
              //   maxWidth: 600,
              // }}
            >
              <Form.Item
                label={<h3>Title</h3>}
                name="title"
                rules={[{ required: true, message: "Please enter your Title" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Title" />
              </Form.Item>
              <Form.Item
                label={<h3>Cuisine</h3>}
                name="cuisine"
                rules={[{ required: true, message: "Please enter Cuisine" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="cusine" />
              </Form.Item>
              <Form.Item
                label={<h3>Meal Type</h3>}
                name="mealtype"
                rules={[{ required: true, message: "Please enter Meal Type" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Meal Type" />
              </Form.Item>
              <Form.Item
                label={<h3>Description</h3>}
                name="description"
                rules={[
                  { required: true, message: "Please enter Description" },
                ]}
              >
                <Input.TextArea rows={6} placeholder="Meal Type" />
              </Form.Item>
              <Form.Item label={<h3>Upload Image</h3>}>
                <CldUploadButton
                  uploadPreset="hackathon"
                  onUpload={handleUpload}
                  onError={handleError}
                >
                  <Button>Upload Image</Button>
                </CldUploadButton>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {imageupload ? <CheckOutlined /> : <CloseOutlined />}
              </Form.Item>
              <Form.List name="dietrestricts">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? <h3>Diet Restricts</h3> : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Diet Restricts or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Diet Restricts"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: "60%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Diet Restricts
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="ingredients">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? <h3>Ingredients</h3> : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Ingredients or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Ingredients"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: "60%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Ingredients
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="steps">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? <h3>Directions</h3> : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Directions or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Directions"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: "60%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Directions
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </HeaderContainer>
  );
}
