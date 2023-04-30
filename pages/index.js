import Head from "next/head";
import React from "react";
import { Avatar, Card, Col, Row } from "antd";

import Link from "next/link";
import HeaderContainer from "@/component/header";
const server = process.env.SERVER;
export async function getServerSideProps({ req }) {
  try {
    let latest_feeds = await fetch(server + "/api/recipe/get_latest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    latest_feeds = await latest_feeds.json();

    let recipes = await fetch(server + "/api/recipe/get_recipe_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    recipes = await recipes.json();

    if (latest_feeds.status) {
      return {
        props: {
          latest_feeds: latest_feeds.data,
          recipes: recipes.data,
        },
      };
    } else {
      return {
        props: {
          latest_feeds: [],
          recipes: [],
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        latest_feeds: [],
        recipes: [],
      },
    };
  }
}

export default function HomePage({ latest_feeds, recipes }) {
  return (
    <>
      <Head>
        <title>Chef Food</title>
        <meta name="description" content="Chef Food" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <HeaderContainer>
        <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <h1 style={{ fontSize: "20px", fontStyle: "italic" }}>
            Discover Delicious Recipies
          </h1>
          <br />
          <Row justify="space-around">
            {recipes.map((item, id) => {
              return (
                <Link
                  key={id}
                  href={`/recipe/${encodeURIComponent(item.id)}`}
                  passHref
                >
                  <Avatar size={70} src={item.url} />
                </Link>
              );
            })}
          </Row>
          <br />
          <br />
          <h1 style={{ fontSize: "20px", fontStyle: "italic" }}>
            Latest Recipies
          </h1>
          <Row justify="space-around">
            {latest_feeds.map((item, id) => {
              return (
                <Col key={id} style={{ marginTop: "10px" }}>
                  <Link
                    href={`/recipe/${encodeURIComponent(item.id)}`}
                    passHref
                  >
                    <Card
                      style={{
                        width: "220px",
                        height: "260px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundImage: `url(${item.url})`,
                      }}
                    />
                    <div>
                      <p>{item.title}</p>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </div>
      </HeaderContainer>
    </>
  );
}
