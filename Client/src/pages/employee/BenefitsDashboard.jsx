import React from "react";
import { ScanHeart, Landmark } from "lucide-react";
import Button from "../../component/others/Button";
import "../../assets/styles/benefitsDashboard.css";

const BenefitsDashboard = () => {
  const handleEditBenefits = () => {};
  return (
    <div className="flex flex-column flex-center benefits-dashboard-container">
      <div className="bg-white flex-column justify-between benefits-dashboard-details">
        <h1>Benefits</h1>
        <div className="medical-care-plan">
          <h4>
            <ScanHeart /> Medical Care Plan
          </h4>
          <hr />
          <p>Plan </p>
          <p>Yearly Cost:</p>
          <p>Monthly Cost:</p>
        </div>
        <br />
        <br />
        <div className="contribution-to-nssf">
          <h4>
            <Landmark />
            Contribution to NSSF:
          </h4>
          <hr />
          <p>Contributed: </p>
          <p>Monthly Cost:</p>
        </div>

        <div className="benefits-dashboard-edit-btn">
          <Button
            text="Edit Benefits"
            onClick={handleEditBenefits}
            className={"edit-benefits-btn"}
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default BenefitsDashboard;
