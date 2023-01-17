import Background from "../../components/Background";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Router from "next/router";
import { UserRole } from "../../models/UserRole";
import { useState } from "react";
import { useUser } from "../../lib/hooks";

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      role: e.currentTarget.role.value,
    };

    if (body.password !== e.currentTarget.repeatpassword.value) {
      setErrorMsg("The passwords don't match");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/user/login");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout displayNav={false}>
      <div className="mt-20 mb-20">
        <Header title="Create Account" />
        <Container>
          <div className="mb-3">
            <Form title="Sign Up" buttonText="Create" onSubmit={handleSubmit}>
              <div className="py-6 space-y-3">
                <Input
                  name="username"
                  title="Email Address"
                  placeholder="JohnDoe@example.com"
                  type="email"
                />
                <Input
                  name="password"
                  title="Password"
                  placeholder="Password"
                  type="password"
                />
                <Input
                  name="repeatpassword"
                  title="Repeat Password"
                  placeholder="Repeat Password"
                  type="password"
                />
                <Input name="role" type="hidden" defaultValue={UserRole.USER} />
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Signup;
