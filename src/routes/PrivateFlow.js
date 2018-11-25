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
import * as actions from "../actions";
import { DB } from "../configs/database";
import { Products, Categories, Clients, Orders } from "../pages";
import { Sales } from "../pages/Sales";

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

//function to make the data the right way
const arrangeData = data => {
  const _rowType = Object.keys(data)[0];
  const newRow = data[_rowType].map(e => ({ ...e, key: e.id, _rowType }));
  return { ...data, [_rowType]: newRow };
};

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
        component: Clients,
        path: this.props.match.url + "/clients"
      },
      {
        component: Orders,
        path: this.props.match.url + "/orders"
      },
      {
        component: Sales,
        path: this.props.match.url + "/sales"
      },
      {
        component: Clients,
        path: "/"
      }
    ]
  };

  render() {
    const { menuCollapsed } = this.state;
    return (
      <Layout>
        <Sider
          collapsedWidth={50}
          collapsed={menuCollapsed}
          width={250}
          style={{ boxShadow: "0 0 30px rgba(0,0,0,.1)", zIndex: 10 }}
        >
          <h2
            style={{ height: 50, backgroundColor: "#3c63fe", color: "white" }}
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
          <Content>
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
      () => {
        DB.allDocs({ include_docs: true }).then(() => {
          //categories
          DB.rel
            .find("categories")
            .then(arrangeData)
            .then(this.props.updateCategory);

          //Products
          DB.rel
            .find("products")
            .then(arrangeData)
            .then(this.props.updateProducts);

          //Clients
          DB.rel
            .find("clients")
            .then(arrangeData)
            .then(this.props.updateClients);

          //Orders
          DB.rel
            .find("orders")
            .then(arrangeData)
            .then(data => {
              const orders = data.orders.filter(order => !!!order.sold);
              data.orders = orders;
              return data;
            })
            .then(this.props.updateOrders);

          //Sales
          DB.rel
            .find("orders")
            .then(arrangeData)
            .then(data => {
              const orders = data.orders.filter(order => !!order.sold);
              data.orders = orders;
              return data;
            })
            .then(this.props.updateSales);
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
        {/* <MenuItem key="/app">
          <Link to={url}>
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Link>
        </MenuItem> */}
        {/* <MenuItem key="/app/employees">
          <Link to={url + "/employees"}>
            <Icon type="team" />
            <span>Employees</span>
          </Link>
        </MenuItem> */}
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
  { logout: actions.userLoggedOut, ...actions }
)(PrivateFlow);
