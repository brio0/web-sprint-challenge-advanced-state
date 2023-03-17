import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.quiz)
      props.fetchQuiz()
  }, [])
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>
            <div id="quizAnswers">
              {props.quiz.answers.map((answer, index) => (
                <div answer={answer} key={index} className={props.selectedAnswer === index ? 'answer selected' : 'answer'}>
                  {props.quiz.answers[index].text}
                  <button onClick={() => dispatch(props.selectAnswer(index))} >
                    {props.selectedAnswer === index ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
              {/* <div className="answer">
                {props.quiz.answers[0].text}
                <button >
                  Select
                </button>
              </div>

              <div className="answer">
                {props.quiz.answers[1].text}
                <button>
                  Select
                </button>
              </div> */}
            </div>

            <button id="submitAnswerBtn" onClick={(() => props.postAnswer({
              quiz_id: props.quiz.quiz_id,
              answer_id: props.selectedAnswer === 0 ? props.quiz.answers[0].answer_id : props.quiz.answers[1].answer_id
            }))} disabled={props.selectedAnswer === null ? true : false}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
export default connect(st => st, actionCreators)(Quiz)