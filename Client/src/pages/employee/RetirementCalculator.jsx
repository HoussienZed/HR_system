import React, { useState } from "react";
import accountingSvg from "../../assets/accounting.svg";
import Input from "../../component/others/Input";
import "../../assets/styles/retirementCalculator.css";
import Button from "../../component/others/Button";

const RetirementCalculator = () => {
  const [workStartingDate, setWorkStartingDate] = useState();
  const [workEndingDate, setWorkEndingDate] = useState();
  const [lastBasicSalary, setLastBasicSalary] = useState();
  const [retirementAmount, setRetirementAmount] = useState("");

  const handleRetirementCalculation = () => {
    setRetirementAmount();
  };

  return (
    <div className="retirement-calculator-container">
      <div className="inputs-svg-container flex gap-8">
        <div className="flex flex-column items-center gap-4 inputs-container">
          <h1>Retirment Calculator</h1>
          <Input
            type={"text"}
            name={"workStartingDate"}
            value={workStartingDate}
            onChange={(e) => setWorkStartingDate(e.target.value)}
            placeholder={"Enter your work starting date"}
            className={"body2 rounded-lg calculator-input"}
          />
          <Input
            type={"text"}
            name={"workEndingDate"}
            value={workEndingDate}
            onChange={(e) => setWorkEndingDate(e.target.value)}
            placeholder={"Enter your work ending date"}
            className={"body2 rounded-lg calculator-input"}
          />
          <Input
            type={"text"}
            name={"lastBasicSalary"}
            value={lastBasicSalary}
            onChange={(e) => setLastBasicSalary(e.target.value)}
            placeholder={"Enter your last basic salary"}
            className={"body2 rounded-lg calculator-input"}
          />
          <Button
            text="Calculate Retirement Amount"
            onClick={handleRetirementCalculation}
            className={"payroll-dashboard-view"}
            textColor="text-white"
          />
          <Input
            type={"text"}
            name={"retiremenAmount"}
            value={retirementAmount}
            readonly
            placeholder={"Enter your last basic salary"}
            className={"body2 rounded-lg calculator-input"}
          />{" "}
        </div>
        <div className="calculator-image-container">
          <img src={accountingSvg} alt="" className="calaculator-image" />
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
