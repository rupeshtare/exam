import React from "react";
import PropTypes from "prop-types";
import { splitAndTitleCase } from "../../helpers/SplitAndTitleCase";

const Table = ({ tableClass, tableHeaderClass, tableData, tableColumns }) => {

    const tableHeader = tableColumns.map((column, index) =>
        <th scope="col" key={index}>{splitAndTitleCase(column)}</th>
    );

    const tableBody = tableData.map((row, index) =>
        <tr key={index}>
            {tableColumns.map((column, iindex) => <td key={index, iindex}>{row[column]}</td>)}
        </tr>
    );

    return (
        <table className={tableClass}>
            <thead className={tableHeaderClass}>
                <tr>{tableHeader}</tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    tableClass: PropTypes.string,
    tableHeaderClass: PropTypes.string,
    tableData: PropTypes.array.isRequired,
    tableColumns: PropTypes.array.isRequired
}

Table.defaultProps = {
    tableClass: "table table-sm",
    tableHeaderClass: "thead-dark"
}

export default Table;