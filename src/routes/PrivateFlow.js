import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Button,
  Avatar,
  Menu,
  Dropdown,
  Icon,
  notification
} from "antd";
import Dashboard from "../pages/Dashboard/Dashboard";
import { USER_DB } from "../configs";
import { userLoggedOut, updateCategory, updateProducts } from "../actions";
import { DB } from "../configs/database";
import { Products, Categories } from "../pages";

const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

const menuNotifications = (
  <Menu>
    <MenuItemGroup title="Notifications">
      <MenuItem>Notification one</MenuItem>
      <MenuItem>Notification two</MenuItem>
      <MenuItem>Notification three</MenuItem>
    </MenuItemGroup>
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
        component: Products,
        path: this.props.match.url + "/products"
      },
      {
        component: Dashboard,
        path: "/"
      }
    ]
  };

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
              "BS"
            ) : (
              <span>
                B<span className="text-black small">ellise</span> S
                <span className="text-black small">tyle</span>
              </span>
            )}
          </h2>
          {this.menuLeft()}
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

  componentDidMount() {
    DB.changes({ since: 0, live: true, include_docs: true }).on(
      "change",
      data => {
        DB.allDocs({ include_docs: true }).then(docs => {
          const _db = docs.rows.map(({ doc }) => ({ key: doc._id, ...doc }));
          const category = _db.filter(e => e.type === "category");
          const products = _db.filter(e => e.type === "product");
          this.props.updateCategory(category);
          this.props.updateProducts(products);

          if (!data.deleted) {
            console.log("[update _db]", _db);
            console.log("[update category]", category);
            console.log("[update products]", products);
          }
        });
      }
    );
  }

  menuLeft = () => {
    const { location, match } = this.props;
    const { url } = match;
    return (
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <MenuItem key="/app">
          <Link to={url}>
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/employees">
          <Link to={url + "/employees"}>
            <Icon type="team" />
            <span>Employees</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/clients">
          <Link to={url + "/clients"}>
            <Icon type="user" />
            <span>Clients</span>
          </Link>
        </MenuItem>

        <MenuItem key="/app/categories">
          <Link to={url + "/categories"}>
            <Icon type="folder" />
            <span>Categories</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/products">
          <Link to={url + "/products"}>
            <Icon type="qrcode" />
            <span>Produits</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/orders">
          <Link to={url + "/orders"}>
            <Icon type="exception" />
            <span>Commandes</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/sales">
          <Link to={url + "/sales"}>
            <Icon type="shopping-cart" />
            <span>Ventes</span>
          </Link>
        </MenuItem>
        <MenuItem key="/app/delivering">
          <Link to={url + "/delivering"}>
            <Icon type="calendar" />
            <span>Livraisons</span>
          </Link>
        </MenuItem>

        <MenuItem key="/app/calculator">
          <Icon type="calculator" />
          <span>Calculator</span>
        </MenuItem>
      </Menu>
    );
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
        {this.props.currentUser.name}
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
}

export default connect(
  ({ currentUser }) => ({ currentUser }),
  { logout: userLoggedOut, updateCategory, updateProducts }
)(PrivateFlow);
