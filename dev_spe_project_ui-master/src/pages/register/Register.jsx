import React, { useState } from 'react';
import "./register.scss";
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

function Register() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          phone_number: values.phone_number,
          is_admin: false,
          address: {
            street: values.street,
            city: values.city,
            postal_code: values.postal_code,
            country: values.country,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      // Reset error state if registration is successful
      setError(null);
  
      // Redirect to the login page
      navigate("/login");
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
    <section style={styles.section} className='registerSection'>
      <div style={styles.container}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img className="logo" src="/images/foodtasticLogo1.png" alt="" />
            <Title style={styles.title}>Register</Title>
            <Text style={styles.text}>
              Create your Foodtastic account by filling out the form below.
            </Text>
          </div>
          {/* Display error message if error state is not null */}
          {error && <Text type="danger">{error}</Text>}
          <Form
            name="normal_register"
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
            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
              />
            </Form.Item>
            <Form.Item
              name="street"
              rules={[
                {
                  required: true,
                  message: "Please input your Street Address!",
                },
              ]}
            >
              <Input placeholder="Street Address" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="postal_code"
              rules={[
                {
                  required: true,
                  message: "Please input your Postal Code!",
                },
              ]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your Country!",
                },
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Already have an account?</Text>{" "}
                <Link to="/login">Login now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Register;
