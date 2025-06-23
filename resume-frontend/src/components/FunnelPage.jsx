import React from "react";
import SalesFunnel from "../components/SalesFunnel";

const FunnelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-12">
        <SalesFunnel />
      </div>
    </div>
  );
};

export default FunnelPage;
