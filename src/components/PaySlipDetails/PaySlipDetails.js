import React from 'react';
import {Table} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import './PaySlipDetails.css';


class PaySlipDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.val;
    this.isSuccessful = false;
    this.isError = false;
    this.errorMessage = '';
  }

savePaySlipDetails= event =>{

event.preventDefault();
const headers = {
    'Content-Type': 'application/json'
};
const paySlipData = {
  firstName: this.props.val.firstName,
  lastName: this.props.val.lastName,
  annualSalary: this.props.val.annualSalary,
  superRate: this.props.val.superRate,
  payDate: this.props.val.payDate,
  payFrequency: this.props.val.payFrequency,
  grossIncome: this.props.val.grossIncome,
  incomeTax:this.props.val.incomeTax,
  netIncome:this.props.val.netIncome,
  superValue:this.props.val.superValue,
  payValue:this.props.val.payValue
};

  axios
  .post('http://localhost:8182/savepayslipforaudit', paySlipData, headers)
  .then((response) => {
		if (response.status === 200) {
    console.log(response);
      return (<div className = "SuccessMessage">
               <style>
                 color: #008B8B;
                   </style>
               <h4> PaySlip Details have been saved Successfully.</h4>
               </div>);
                     }
	},
	(error) => {
  console.log(error);
    return (<div className = "ErrorMessage">
             <style>
              color: #FF0000;
                 </style>
             <h4>Error while  saving the payslip details: {error}</h4>
             </div>);
  }
		)
}
  render() {
    if (this.isSuccessful) {
     return <div className = "SuccessMessage">
              <style>
                color: #008B8B;
                  </style>
              <h4> PaySlip Details have been saved Successfully.</h4>
              </div>;
   }

    return (
      <div className = "payslipwrapper">
      <form className="payslip-details-form" onSubmit={this.savePaySlipDetails}>
      <h4>Payslip </h4>
      <h5> {this.props.val.firstName + " "}{this.props.val.lastName} </h5>
      <Table striped bordered hover className="paytable">

  <tbody>
    <tr>
      <td>Pay Date</td>
      <td>{this.props.val.payDate}</td>
    </tr>
    <tr>
      <td>Pay Frequency</td>
      <td>{this.props.val.payFrequency}</td>
    </tr>
    <tr>
      <td>Annual Income</td>
      <td>${this.props.val.annualSalary}.00</td>
    </tr>
    <tr>
      <td>Gross Income</td>
      <td>${this.props.val.grossIncome}.00</td>
    </tr>
    <tr>
      <td>Income Tax</td>
      <td>${this.props.val.incomeTax}.00</td>
    </tr>
    <tr>
      <td>Net Income</td>
      <td>${this.props.val.netIncome}.00</td>
    </tr>
    <tr>
      <td>Super</td>
      <td>${this.props.val.superValue}.00</td>
    </tr>
    <tr>
      <td>Pay</td>
      <td>${this.props.val.payValue}.00</td>
    </tr>
  </tbody>
</Table>

<div className="paybutton">
  <Button type="submit">Pay</Button>
  </div>
    </form>
</div>


    );
  }
}

export default PaySlipDetails;
