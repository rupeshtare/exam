import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import QuestionList from "./QuestionList/QuestionList";

class ExamPaperNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      paper: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.getQuestionPaper();
  }

  getQuestionPaper() {
    this.props.getQuestionPaper(this.state.paper).then((res) => {
      let { questions } = res.data;
      this.setState({ questions });
    });
  }

  render() {
    return (
      <div className="row p-4 h-70">
        <div className="col-md-8">
          <div className="h-75">Question</div>
          <div className="row">
            <button className="btn btn-success btn-sm">Save & Next</button>
            <button className="btn btn-warning btn-sm">
              Save & Mark for Review
            </button>
            <button className="btn btn-primary btn-sm">
              Mark for Review & Next
            </button>
            <button className="btn btn-light btn-sm"> Next</button>
            <button className="btn btn-secondary btn-sm">Clear Response</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row my-2 py-2 border">
            <span>Timer</span>
          </div>
          <QuestionList questionCounts={5} />
        </div>
      </div>
    );
  }
}

ExamPaperNewForm.propTypes = {
  examSubmitRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getQuestionPaper: PropTypes.func.isRequired,
};

export default withRouter(ExamPaperNewForm);
