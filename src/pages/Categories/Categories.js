import React, { Component } from "react";
import CatForm from "./CatForm";
import CatTable from "./CatTable";
import PageHeader from "../../components/auth/PageHeader";

class Categories extends Component {
  render() {
    return (
      <div className="px-3">
        <PageHeader title="Category" FormElement={CatForm} />
        <CatTable />
      </div>
    );
  }
}

export { Categories };
