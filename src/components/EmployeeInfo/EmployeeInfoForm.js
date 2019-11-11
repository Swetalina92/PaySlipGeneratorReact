import React from 'react';
import { AiOutlinePercentage } from 'react-icons/ai';
import { TiDownloadOutline } from 'react-icons/ti';
import { FiDollarSign } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import MediaQuery from 'react-responsive';

import './EmployeeInfoForm.css';
import PaySlipDetails from '../PaySlipDetails/PaySlipDetails.js';


class EmployeeInfoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    data: {
      firstName: '',
      lastName:'',
      annualSalary: '',
      superRate: '',
      payDate: '',
      payFrequency: '',
      grossIncome: '',
      incomeTax:'',
      netIncome:'',
      superValue:'',
      payValue:'',
      isButtonClicked: false
      }
    };
  }


changeFirstNameEvent = (e) => {
  this.setState({data:{...this.state.data, firstName: e.target.value}});
}

changeLastNameEvent = (e) => {
this.setState({data:{...this.state.data, lastName: e.target.value}});
}

changeAnnualSalaryEvent = (e) => {
this.setState({data:{...this.state.data, annualSalary: e.target.value}});
}

changeSuperRateEvent = (e) => {
this.setState({data:{...this.state.data, superRate: e.target.value}});
}

generatePayslip= event =>{
event.preventDefault();
  let incomeTax;
  const date = new Date().getDate();
  const month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"][new Date().getMonth()];
  const year = new Date().getFullYear();
  const payDate = date+ " " + month + " " + year;
  const annualSalary = this.state.data.annualSalary;
  const employeeSuper = this.state.data.superRate;

    if (annualSalary <= 18200){
    	incomeTax = 0;
    }else if(annualSalary > 18200 && annualSalary <= 37000){
    	incomeTax = Math.round((((annualSalary - 18200)* (19/1000)))/12);
    }else if(annualSalary > 37000 && annualSalary <= 80000){
    	incomeTax = Math.round(( 3572 + ((annualSalary - 37000)* (325/1000)))/12);
    }else if(annualSalary > 80000 && annualSalary <= 180000){
    	incomeTax = Math.round(( 17547 + ((annualSalary - 80000)* (37/1000)))/12);
    }else if(annualSalary > 180000){
    	incomeTax = Math.round(( 54547 + ((annualSalary - 180000)* (45/1000)))/12);
    }
    const grossIncome =  Math.round(annualSalary/12);
    const netIncome = grossIncome - incomeTax;
    const superValue = Math.round(grossIncome*employeeSuper/100);
    const payValue = netIncome - superValue;

    this.setState(prevState => ({
      data: {
          ...prevState.data,
      annualSalary: annualSalary,
      payDate: payDate,
      payFrequency: 'Monthly',
      grossIncome: grossIncome,
      incomeTax: incomeTax,
      netIncome: netIncome,
      superValue: superValue,
      payValue:payValue,
      isButtonClicked: true
    }
    }))
}
  render() {
    return (
      <div className="mainwrapper">
      <MediaQuery query="(min-width:320px)">
        <div className="container">
          <form className="employee-info-form" onSubmit={this.generatePayslip}>
            <h2>Employee Info </h2>
              <div className="name">
                  <input type = "text" className="firstname" name = "firstname" placeholder = "Firstname"  onChange={this.changeFirstNameEvent} />
                  <span className="firstnameicon"> <TiDownloadOutline /> </span>

              <input type = "text" className="lastname" name = "lastname" placeholder = "Lastname"  onChange={this.changeLastNameEvent} />
          </div>
          <div className="salary">
            <span className="dollaricon"> <FiDollarSign /> </span>
            <input type="number"  min={0}  max={500000}  className="annualsalary" name="annualsalary" placeholder = "Annual Salary" onChange={this.changeAnnualSalaryEvent} />
            <span className="decimalicon"> .00 </span>
            <span className="percentageicon"> <AiOutlinePercentage /> </span>
            <input type="number" min={0} max={15} step={0.1} className="superrate" name="superrate" placeholder = "Super Rate"  onChange={this.changeSuperRateEvent} />

        </div>
        <div className="generatebutton">
          <Button type="submit">Generate Payslip</Button>
          </div>
      </form>
      </div>
      <div  className="payslip">
        {this.state.data.isButtonClicked && <PaySlipDetails val={this.state.data} />}
        </div>
        </MediaQuery>
      </div>
    );
  }
}

export default EmployeeInfoForm;
