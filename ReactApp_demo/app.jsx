import React from 'react';
import Questions from './Const.js'

var QuestnIndex = 0;


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      Questions : Questions,
      currentQuestn : QuestnIndex
    }
    this.showPrevQtn = this.showPrevQtn.bind(this);
    this.showNextQtn = this.showNextQtn.bind(this);
    this.renderSelectedQuestion = this.renderSelectedQuestion.bind(this);
  }

  showPrevQtn(){
    if(QuestnIndex > 0)
    {
      QuestnIndex--;
      this.setState({Questions : Questions, currentQuestn : QuestnIndex});
    }
    }

  showNextQtn(){
   if(QuestnIndex< Questions.length-1){
    QuestnIndex++;
    this.setState({Questions : Questions, currentQuestn : QuestnIndex});
   }
  }

  componentDidUpdate(){
  }

  renderSelectedQuestion(e){
    this.setState({Questions : Questions, currentQuestn : e.currentTarget.value});
  }

  render(){
    console.log(this.state.Questions[this.state.currentQuestn]);
    return (
      <div>
        <button className="Previous" onClick={this.showPrevQtn}> Previous Question </button>
        <QABlock Question={this.state.Questions[this.state.currentQuestn]} currentQuestionindex = {this.state.currentQuestn} />
        <button className="Next" onClick={this.showNextQtn}> Next Question </button>
        <QuestionsPane Questions={this.state.Questions} renderSelectedQuestion={this.renderSelectedQuestion}/>
      </div>
    );
  }
}


/*
 * component QABlock
 * props :
 *       Question : Object containing the following data
 *       ------------------------------------------------------------
 *       id : questionId (number)
 *       question : Question to be  (string)
 *       options : Array of possible answers (array of strings)
 *       ------------------------------------------------------------
 */

 class QABlock extends React.Component{
    constructor(props){
      super(props);
      console.log(this.props);
      this.state = {
        currentQuestionId : this.props.Question.id,
        answerSelected : null
      }
      this.captureAnswer = this.captureAnswer.bind(this);
      this.onSubmitClick = this.onSubmitClick.bind(this);
      this.onReviewClick = this.onReviewClick.bind(this);
    }
    captureAnswer(e){
      this.state.answerSelected = e.target.value;
    }
    onSubmitClick(){
      if(this.state.answerSelected !== null){
        this.props.Question.answerSelected = this.state.answerSelected;
        this.props.Question.submittedAnswer = true;
        this.props.Question.addedToReview = false;
      }
    }
    onReviewClick(){
      if(this.state.answerSelected !== null){
        this.props.Question.answerSelected = this.state.answerSelected;
        this.props.Question.addedToReview = true;
        this.props.Question.submittedAnswer = false;
      }
    }

    checkAns(index){
      if(this.props.Question.answerSelected === index){
        return 'checked';
      }
    }

    render(){
    return(
      <div className='QABlock'>
          <Question question={this.props.Question.question} />
          <ul className="optionsList">{this.props.Question.options.map(function(pAns,index){
            return <li key={this.props.currentQuestionindex + " "+index}> <input type='radio' name={this.props.Question.id} value={index} onClick = {this.captureAnswer} checked = {this.checkAns(index)}/> {pAns} <br/> </li>;
          }.bind(this))}
          </ul>
          <SubmitBtns submitClicked={this.onSubmitClick} onReviewClick={this.onReviewClick} />

      </div>
      );
    }
}

class Question extends React.Component{
  render (){
      return (
      <h2 className='question'>{this.props.question}</h2>
      );
  }
}


/*
 * component SubmitBtns
 * props :
 *       submitClicked : function on submit button click (function)
 *       onReviewClick : function on review later button click (function)
 */

class SubmitBtns extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
  return(
    <div className = 'btnsDiv'>
      <button className = 'submitBtn' onClick = {this.props.submitClicked}>Submit</button>
      <button className = 'reviewbtn'onClick = {this.props.onReviewClick}>Review Later</button>
    </div>
    );
  }
}


/*
 * component QuestionsPane
 * props :
 *       Questions : The array of all the questions (array of objects)
 */

class QuestionsPane extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
  return(
    <div className = 'paneDiv'>
    <ul className="paneList">{this.props.Questions.map(function(question,index){
      return <li key={index} className='paneQuestion' onClick= {this.props.renderSelectedQuestion} value={index}> <span>{index + 1}</span> </li>;
     }.bind(this))}
    </ul>
    </div>
    );
  }
}


export default App;
