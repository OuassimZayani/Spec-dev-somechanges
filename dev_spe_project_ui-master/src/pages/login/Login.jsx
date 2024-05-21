import React, { useState } from 'react';
import "./login.scss";
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // Reset error state if login is successful
      setError(null);

      // Parse response data as JSON
      const userData = await response.json();
      // console.log("Print userData when Logging in", userData)
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      // Set error message in case of failure
      setError(error.message);
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };
  return (
    <section style={styles.section} className='loginSection'>
      <div style={styles.container}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img className="logo" src="/images/foodtasticLogo1.png" alt="" />
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>
              Welcome to Foodtastic! Please enter your details below to
              sign in.
            </Text>
          </div>
          {/* Display error message if error state is not null */}
          {error && <Text type="danger">{error}</Text>}
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a style={styles.forgotPassword} href="">
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>{" "}
                <Link to="/register">Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;
