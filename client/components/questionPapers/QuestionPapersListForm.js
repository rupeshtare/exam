import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import CustomLink from "../../utils/customLink";


class QuestionPapersListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPapers: [],
        }
        this.getQuestionPapers();
    }

    getQuestionPapers() {
        this.props.getQuestionPapers().then(
            res => { this.setState({ questionPapers: res.data.questionPapers }) },
            err => { this.props.addFlashMessage({ type: "success", text: "Error in loading question papers." }) }
        );
    }

    render() {
        const { questionPapers } = this.state;
        return (
            <form>
                <h5>Question Papers</h5>
                <div className="row">
                    {
                        questionPapers.map((paper, index) =>
                            <div className="col col-lg-3" key={index}>
                                <div className="card paperCard">
                                    <div className="card-body">
                                        <h5 className="card-title">{paper.name}</h5>
                                        <p className="card-text">{paper.subject}</p>
                                        <div className="d-flex justify-content-between">
                                            <CustomLink condition="T" to={`/questionPapers/edit/${paper.id}`}>Edit</CustomLink>
                                            {paper.locked === 1 ?
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                                                    <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                                                </svg> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </form >
        )
    }
}

QuestionPapersListForm.propTypes = {
    getQuestionPapers: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default withRouter(QuestionPapersListForm);