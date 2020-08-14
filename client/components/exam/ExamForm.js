import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { differenceBy, map, find } from "lodash";


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
                var modifiedResult = map(this.state.results, o => { return {...o, ...find(questionPapers, ["id", o.question_paper])}});

                this.setState({
                    questionPapers,
                    unSolvedPapers: differenceBy(map(questionPapers, o => { return { question_paper: o.id, ...o } }), this.state.results, "question_paper"),
                    results: modifiedResult
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
                                        <h5 className="card-title">{result.name}</h5>
                                        <p className="card-text">{result.subject}</p>
                                        <Link to={`/exam/${result.question_paper}`}>Marks: {result.total_marks}</Link>
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
                                        <h5 className="card-title">{paper.name}</h5>
                                        <p className="card-text">{paper.subject}</p>
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