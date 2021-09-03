import React from "react";
import { IMAGE_URL } from '../../store/constants';

function InvestHistoryTable({investments})
{ 
    const getTableItem = (investment, index) => {
        return (
          <tr key={index}>
            <td>{ investment.issue_date }</td>
            <td>$ { investment.units }</td>
            <td>{ investment.units } { investment.class_of_unit } Class Units</td>
            <td>{ investment.shares } { investment.underlying_share_class } { investment.company_detail.name }</td>
            <td><img width="150" height="100" src={ IMAGE_URL + investment.company_detail.logo } alt="company-logo"/></td>
          </tr>
        );
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
        { investments && investments.length > 0 &&
          investments.map((investment, idx) => getTableItem(investment, idx))
        }
      </tbody>
    </table>
    </div>);
}
export default InvestHistoryTable;