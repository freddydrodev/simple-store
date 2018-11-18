import React, { Component } from "react";
import LocalForm from "./LocalForm";
import LocalTable from "./LocalTable";
import PageHeader from "../../components/auth/PageHeader";

class Clients extends Component {
  render() {
    return (
      <div className="px-3">
        <PageHeader title="Clients" FormElement={LocalForm} />
        <LocalTable />
      </div>
    );
  }
}

export { Clients };
