import React from 'react';
import Questions from './Const.js'

var QuestnIndex = 0;
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      Question : Questions[QuestnIndex]
    }
    this.showPrevQtn = this.showPrevQtn.bind(this);
    this.showNextQtn = this.showNextQtn.bind(this);
  }

  showPrevQtn(){
    QuestnIndex--;
    this.setState({Question : Questions[QuestnIndex]});
  }

  showNextQtn(){
    QuestnIndex++;
    this.setState({Question : Questions[QuestnIndex]});
  }

  render(){
    return (
      <div>
        <button className="Previous" onClick={this.showPrevQtn}> Previous Question </button>
        <QABlock Question={this.state.Question}/>
          <button className="Next" onClick={this.showNextQtn}> Next Question </button>
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
      this.props.Question.submittedAnswer = this.state.answerSelected;
    }
    onReviewClick(){
      this.props.Question.addedToReview = true;
    }

    render(){
    console.log(this.props);
    return(
      <div className='QABlock'>
          <Question question={this.props.Question.question} />
          <ul className="optionsList">{this.props.Question.options.map(function(pAns,index){
            return <li key={index}> <input type='radio' name={this.props.Question.id} value={index} onClick = {this.captureAnswer}/> {pAns} <br/> </li>;
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
 *       Questions : function on submit button click (function)
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


export default App;
