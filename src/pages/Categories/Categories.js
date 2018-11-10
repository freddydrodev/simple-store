import React, { Component } from "react";
import CatForm from "./CatForm";
import CatTable from "./CatTable";

class Categories extends Component {
  render() {
    return (
      <div>
        <div className="flex between middle py-3">
          <h2 className="page-legend">Category</h2>
          <CatForm />
        </div>
        <CatTable />
      </div>
    );
  }
}

export default Categories;
