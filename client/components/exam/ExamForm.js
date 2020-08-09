import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { differenceBy, map } from "lodash";


class ExamForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            questionPapers: [],
            unSolvedPapers: [],
            isLoading: false,
            invalid: false
        }

        this.getExamRsults();
        // this.getQuestionPapers();
    }

    getExamRsults() {
        this.props.getExamRsults().then(res => {
            this.setState({ results: res.data.results });

            this.props.getQuestionPapers().then(res => {
                const { questionPapers } = res.data;
                this.setState({
                    questionPapers: res.data.questionPapers,
                    unSolvedPapers: differenceBy(map(questionPapers, o => { return { question_paper: o.id } }), this.state.results, "question_paper")
                });
            });
        });
    }

    getQuestionPapers() {
        this.props.getQuestionPapers().then(res => {
            this.setState({ questionPapers: res.data.questionPapers });
        });
    }

    render() {
        const { unSolvedPapers, results, isLoading, invalid } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h5>Exam</h5>
                <div className="row">
                    {
                        results.map((result, index) =>
                            <div className="col col-lg-3" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Question Paper # {result.question_paper}</h5>
                                        <p className="card-text">Chemistry</p>
                                        <b className="card-text">Marks: {result.total_marks}</b>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        unSolvedPapers.map((paper, index) =>
                            <div className="col col-lg-3" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Question Paper # {paper.question_paper}</h5>
                                        <p className="card-text">Chemistry</p>
                                        <Link to={`/exam/${paper.question_paper}`}>Start</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </form>
        )
    }
}

ExamForm.propTypes = {
    getExamRsults: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func,
    getQuestionPapers: PropTypes.func.isRequired,
}

export default withRouter(ExamForm);