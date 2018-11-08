import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";
import {
  Layout,
  Button,
  Avatar,
  Menu,
  Dropdown,
  Icon,
  notification
} from "antd";
import { connect } from "react-redux";
import { USER_DB } from "../configs";
import { userLoggedOut } from "../actions";

const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const { SubMenu } = Menu;

const menuNotifications = (
  <Menu>
    <MenuItemGroup title="Notifications">
      <MenuItem>Notification one</MenuItem>
      <MenuItem>Notification two</MenuItem>
      <MenuItem>Notification three</MenuItem>
    </MenuItemGroup>
  </Menu>
);

const menuLeft = (
  <Menu mode="inline" style={{ height: "calc(100vh - 72px)" }}>
    <SubMenu
      title={
        <span>
          <Icon type="stock" theme="outlined" style={{ fontSize: 18 }} />
          <span>Statistics</span>
        </span>
      }
    >
      <MenuItem key="dashboard">Dashboard</MenuItem>
    </SubMenu>
    <SubMenu
      title={
        <span>
          <Icon type="user" theme="outlined" style={{ fontSize: 18 }} />
          <span>Utilisateurs</span>
        </span>
      }
    >
      <MenuItem key="delivrer">Livreurs</MenuItem>
      <MenuItem key="clients">Clients</MenuItem>
    </SubMenu>
    <SubMenu
      title={
        <span>
          <Icon type="shop" theme="outlined" style={{ fontSize: 18 }} />
          <span>Commerce</span>
        </span>
      }
    >
      <MenuItem key="categories">Categories</MenuItem>
      <MenuItem key="products">Produits</MenuItem>
      <MenuItem key="orders">Commandes</MenuItem>
      <MenuItem key="sales">Ventes</MenuItem>
    </SubMenu>
    <SubMenu
      title={
        <span>
          <Icon type="tool" theme="outlined" style={{ fontSize: 18 }} />
          <span>Outils</span>
        </span>
      }
    >
      <MenuItem key="calculator">Calculator</MenuItem>
    </SubMenu>
  </Menu>
);

class PrivateFlow extends Component {
  state = {
    menuCollapsed: false,
    flow: [
      {
        component: Categories,
        path: this.props.match.url + "/categories"
      },
      {
        component: Dashboard,
        path: "/"
      }
    ]
  };

  menuRight = () => (
    <Menu mode="horizontal" className="appMenuRight">
      <MenuItem>
        <Dropdown
          getPopupContainer={() => document.querySelector(".header-app")}
          overlay={menuNotifications}
          trigger={["click"]}
          placement="bottomCenter"
        >
          <Button shape="circle" type="ghost" className="border-transparent">
            <Icon
              type="bell"
              style={{ fontSize: 20, textAlign: "center", marginRight: 0 }}
            />
          </Button>
        </Dropdown>
      </MenuItem>
      <MenuItem>
        <Avatar className="mr-2">FT</Avatar>
        Fredius tout Court
      </MenuItem>
      <MenuItem>
        <Button
          type="primary"
          onClick={() => {
            USER_DB.logOut().then(this.props.logout());
            notification.open({
              message: "Vous vous etes deconnecte",
              type: "success"
            });
          }}
        >
          Deconnection
        </Button>
      </MenuItem>
    </Menu>
  );

  render() {
    const { menuCollapsed } = this.state;
    return (
      <Layout>
        <Sider collapsedWidth={50} collapsed={menuCollapsed} width={250}>
          <h2
            style={{ height: 50, backgroundColor: "#4a27f7", color: "white" }}
            className="mb-0 flex middle center logo-h2"
          >
            {menuCollapsed ? (
              "SS"
            ) : (
              <span>
                S<span className="text-black small">imple</span> S
                <span className="text-black small">tore</span>
              </span>
            )}
          </h2>
          {menuLeft}
        </Sider>
        <Layout>
          <Header className="header-app">
            <div className="flex middle center">
              <Button
                onClick={() =>
                  this.setState({
                    menuCollapsed: !menuCollapsed
                  })
                }
                icon={menuCollapsed ? "align-right" : "align-left"}
                size="large"
                shape="circle"
                style={{ width: 40 }}
                className="border-0 shadow-0"
              />
            </div>
            {this.menuRight()}
          </Header>
          <Content style={{ padding: "0 10px" }}>
            <Switch>
              {this.state.flow.map(r => (
                <Route key={r.path} {...r} />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  null,
  { logout: userLoggedOut }
)(PrivateFlow);
