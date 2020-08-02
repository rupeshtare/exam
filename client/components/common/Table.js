import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { splitAndTitleCase } from "../../helpers/SplitAndTitleCase";

const Table = ({ tableClass, tableHeaderClass, tableData, tableColumns, pagination, previousData, nextData }) => {

    const tableHeader = tableColumns.map((column, index) =>
        <th scope="col" key={index}>{splitAndTitleCase(column)}</th>
    );

    const tableBody = tableData.map((row, index) =>
        <tr key={index}>
            {tableColumns.map((column, iindex) => <td key={index, iindex}>{row[column]}</td>)}
        </tr>
    );

    const { page, pageCount } = pagination

    return (
        <div>
            <table className={tableClass}>
                <thead className={tableHeaderClass}>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={classnames("page-item", { "disabled": page === 1 })}><a className="page-link" href="#" onClick={previousData}>Previous</a></li>
                    <li className="page-item disabled"><a className="page-link" href="#">Page {page} of {pageCount}</a></li>
                    <li className={classnames("page-item", { "disabled": page === pageCount })}><a className="page-link" href="#" onClick={nextData}>Next</a></li>
                </ul>
            </nav>
        </div>
    )
}

Table.propTypes = {
    tableClass: PropTypes.string,
    tableHeaderClass: PropTypes.string,
    tableData: PropTypes.array.isRequired,
    tableColumns: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    previousData: PropTypes.func,
    nextData: PropTypes.func,
}

Table.defaultProps = {
    tableClass: "table table-sm",
    tableHeaderClass: "thead-dark",
}

export default Table;