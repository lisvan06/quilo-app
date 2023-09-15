"use client";

import "./globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Layout, Button, theme, Space, Avatar, ConfigProvider } from "antd";
import MenuUser from "./components/menu_user";
import MenuLeft from "./components/menu_left";
import { Footer } from "antd/es/layout/layout";

const { Header, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [theme, setTheme] = useState<MenuTheme>("light");
  // const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="en">
      <head>
        <title>App Quilo</title>
      </head>

      <body className="m-0">
        <Providers>
          <ConfigProvider direction="ltr">
            <Layout style={{ margin: 0, background: colorBgContainer }} >
              <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <div className="demo-logo-vertical" />
                <MenuLeft />
              </Sider>
              <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, boxShadow: "10px 10px 5px lightblue" }}>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <MenuUser />
                </Header>
                <Content
                  style={{
                    margin: "0px",
                    background: colorBgContainer,
                  }}
                >
                  {children}
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Al Quilo ©2023 By Lisvan
                </Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
