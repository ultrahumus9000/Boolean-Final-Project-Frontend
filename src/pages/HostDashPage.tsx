import React from "react";

import Dashboard from "../components/Dashboard";
import Listings from "../components/Listings";

export default function HostDashPage() {
  return (
    <div className="dashboard">
      <div className="container">
        <h1>(Host Dashboard)</h1>
        <Dashboard />
        <h2> Listings</h2>
        <Listings />
      </div>
    </div>
  );
}
