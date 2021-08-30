import React from "react";
import { Link } from "react-router-dom";
import tab_1 from "../../assets/imgs/tab_1.png";
function InvestHistoryTable()
{
    const array1 = [0,1,2,3,4];
    const getTableItem = (index) => {
        
        return (<tr key={index}>
                        <td>Feb 14, 2018</td>
                        <td>$ 20000.00</td>
                        <td>20,000 B Class Units</td>
                        <td>5,714 Series Seed Preference Shares in Work180 Pty Ltd</td>
                        <td><img src={tab_1} alt="company-logo"/></td>
                    </tr>);
    }
    return (
    <div className="user_history table-responsive">
    <table className="table table-striped history_table ">
      <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Cost</th>
            <th scope="col">ASHPEAK UNITS</th>
            <th scope="col">UNDERLYING ASSET</th>
            <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          array1.map((idx, value) => getTableItem(idx))
        }
      </tbody>
    </table>
    </div>);
}
export default InvestHistoryTable;