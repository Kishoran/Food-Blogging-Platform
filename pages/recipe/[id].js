import HeaderContainer from "@/component/header";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Col,
  Row,
  Input,
  Form,
  Button,
  message,
  Popconfirm,
} from "antd";
import { verify } from "jsonwebtoken";
import moment from "moment";
import { useEffect, useState } from "react";

const server = process.env.SERVER;
const secret = process.env.JWTSECRET; // secret key for authentication
const cookie_name = process.env.COOKIE_NAME; // cookie name

const { TextArea } = Input;
export async function getServerSideProps({ params, req }) {
  let id = params.id.replace(/\-/g, "+");

  let recipe = await fetch(server + "/api/recipe/get_recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  recipe = await recipe.json();

  try {
    const jwt = req.cookies[cookie_name];
    //check if jwt is valid
    let jwtDecoded = verify(jwt, secret);

    return {
      props: {
        recipe: recipe.data,
        // comments: comments.data,
        jwt: jwtDecoded,
        SignedIn: true,
      },
    };
  } catch (error) {
    return {
      props: {
        recipe: recipe.data,
        // comments: comments.data,
        SignedIn: false,
      },
    };
  }
}

const RecipePage = ({ recipe, jwt, SignedIn }) => {
  let [comments, setComments] = useState([]);
  async function downloadComment() {
    comments = await fetch("/api/comments/get_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: recipe.email,
        title: recipe.title,
      }),
    });
    comments = await comments.json();
    if (comments.status) {
      setComments(comments.data);
    }
  }
  useEffect(() => {
    downloadComment();
  }, []);

  const handleComment = async (props) => {
    try {
      let { comment } = props;
      let { email, name } = jwt.user;
      let { title } = recipe;
      let replyto = "op";
      let response = await fetch("/api/comments/create_comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, comment, title, replyto }),
      });
      response = await response.json();
      if (response.status) {
        message.success(response.message);
        downloadComment();
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      let response = await fetch("/api/comments/delete_comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      response = await response.json();
      if (response.status) {
        message.success(response.message);
        downloadComment();
      }
    } catch (error) {}
  };

  return (
    <HeaderContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <Row justify="space-evenly">
          <Col span={24}>
            <br />
            <br />
            <center>
              <p
                style={{
                  fontSize: "30px",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {recipe.title}
              </p>
            </center>
            <br />
          </Col>
          <Col>
            <img src={recipe.url} width={500} alt="sada" height={400} />
            <br />
          </Col>
          <Col span={24}>
            <center>
              <h3>by {recipe.name}</h3>
            </center>
          </Col>
          <Col span={20}>
            <br />
            <br />
            <p
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontStyle: "italic",
              }}
            >
              &quot;{recipe.description}&quot;
            </p>
          </Col>
          <Col span={20} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <br />
            <br />
            <h2>Ingredients</h2>
            <br />
            {recipe.ingredients.map((item, id) => {
              return (
                <h4 key={id}>
                  <b>
                    {id + 1}.&nbsp;&nbsp;&nbsp;{item}
                  </b>
                </h4>
              );
            })}
          </Col>

          <Col span={20} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <br />
            <br />
            <h2>Direction</h2>
            <br />
            {recipe.steps.map((item, id) => {
              return (
                <h4 key={id}>
                  <b>
                    {id + 1}.&nbsp;&nbsp;&nbsp;{item}
                  </b>
                </h4>
              );
            })}
            <br />
            <br />
          </Col>
          <Col span={20}>
            <p style={{ fontSize: "20px" }}>Comments</p>
            <br />
            <Form disabled={!SignedIn} onFinish={handleComment}>
              <Form.Item name="comment">
                <TextArea placeholder="What do you think?" />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
            <br />
            {comments.map((item, id) => {
              if (item.replyto == "op") {
                return (
                  <div key={id}>
                    <hr />
                    <br />
                    <p style={{ fontSize: "14px", color: "grey" }}>
                      <Avatar size={40} icon={<UserOutlined />} />
                      &nbsp;&nbsp;
                      {item.name}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {moment(item.date).startOf("day").fromNow()}
                      <span style={{ float: "right" }}>
                        {item.email == jwt.user.email ? (
                          <Popconfirm
                            title="Delete the comment"
                            description="Are you sure to delete this comment?"
                            onConfirm={() => {
                              handleDelete(item.id);
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button icon={<DeleteOutlined />} type="text" />
                          </Popconfirm>
                        ) : (
                          <div />
                        )}
                      </span>
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {item.comment}
                    </p>
                    <br />
                  </div>
                );
              }
            })}
          </Col>
        </Row>
      </div>
    </HeaderContainer>
  );
};

export default RecipePage;
