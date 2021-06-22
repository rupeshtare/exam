import React from "react";
import PropTypes from "prop-types";

const QuestionList = ({ questionCounts }) => {
  return (
    <div className="my-2">
      <div className="row">
        <h6>Question List</h6>
      </div>
      <div className="row">
        <small className="col-6">
          <span class="badge badge-secondary m-1">0</span>Not Visited
        </small>
        <small className="col-6">
          <span class="badge badge-danger m-1">0</span>Not Answered
        </small>
      </div>
      <div className="row">
        <small className="col-6">
          <span class="badge badge-success m-1">0</span>Answered
        </small>
        <small className="col-6">
          <span class="badge badge-primary m-1">0</span>Marked for Review
        </small>
      </div>
      <div className="row">
        <small className="col-12">
          <span class="badge badge-primary m-1">
            0 <div className="small-badge">&nbsp;</div>
          </span>
          Answered & Marked for Review (will be considered for evaluation)
        </small>
      </div>
      <div className="row my-2">
        <span class="badge badge-secondary m-1">0</span>
        <span class="badge badge-secondary m-1">2</span>
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  questionCounts: PropTypes.number.isRequired,
};

export default QuestionList;
