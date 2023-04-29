import React from "react";

const secret = process.env.JWTSECRET;
const cookie_name = process.env.COOKIE_NAME;

export async function getServerSideProps({ req }) {
  try {
    const jwt = req.cookies[cookie_name];
    //check if jwt is valid
    let jwtDecoded = verify(jwt, secret);

    return {
      props: {
        jwt,
        user: jwtDecoded,
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

export default function ProfilePage({jwt,user}) {
  return <div>ProfilePage</div>;
}
