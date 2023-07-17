/* eslint-disable no-unused-vars */
import { Row, Col } from "react-bootstrap";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiQuestionMark } from "react-icons/bi";

const TEXT_INPUT = "textInput"


const Option = ({ id, className, element }) => {
    console.log("element", element.className)
    const titleFormat = () => {
        if (className.includes(TEXT_INPUT)) {
            return `TEXT INPUT - ${id}`;
        } else {
            return "Invalid";
        }
    }

    const title = titleFormat()

    return (
        <>
            <option value={JSON.stringify({ id, title })}>{title}</option>
            {/* <option value={id}>gggg</option> */}
        </>

    )
}


const SelectAnsAndQuestion = () => {
    const { questionAndAnswerGroupedData, setQuestionAndAnsGroupedData } = useStateContext()
    console.log(questionAndAnswerGroupedData, "questionAndAnswerGroupedData");
    const currentElmId = document.querySelector('.focussedd div').id
    const elements = [...document.querySelectorAll(`.${TEXT_INPUT}`)];
    const [selectedType, setSelectedType] = useState("")
    const answer = "answer"
    const question = "question"


    // const handleSelectTypeChange = (value) => {
    //     const data = [...questionAndAnswerGroupedData];
    //     const currentDataAsQuestion = data.find((elm) => elm.question === currentElmId);
      
    //     if (currentDataAsQuestion) {
    //       const answerExists = currentDataAsQuestion.answers.some(ans => ans === value);
    //       const valueIsQuestion = data.some(elm => elm.question === value);
      
    //       if (answerExists || valueIsQuestion) {
    //         return toast.error('The selected value is already an answer or a question!');
    //       }
      
    //       const newData = { ...currentDataAsQuestion, answers: [...currentDataAsQuestion.answers, value] };
    //       setQuestionAndAnsGroupedData(data.map(elm => (elm.question === currentElmId ? newData : elm)));
    //     } else {
    //       const newData = { question: currentElmId, answers: [value] };
    //       setQuestionAndAnsGroupedData([...questionAndAnswerGroupedData, newData]);
    //     }
    //   }

    const handleSelectTypeChange = (passedData) => {
        const { id, title } = JSON.parse(passedData)
        const questions = new Set();
        const answers = new Set();

        const data = [...questionAndAnswerGroupedData].map(elm => {
            questions.add(elm.question);
            answers.add(...elm.answers);
            return elm;
        });

        if (questions.has(id) || answers.has(id)) {
            return toast.error(`${title} is already an answer or a question!`);
        }

        const currentDataAsQuestion = data.find((elm) => elm.question === currentElmId);

        if (currentDataAsQuestion) {
            const newData = { ...currentDataAsQuestion, answers: [...currentDataAsQuestion.answers, id] };
            setQuestionAndAnsGroupedData(data.map(elm => (elm.question === currentElmId ? newData : elm)));
        } else {
            if (currentElmId === id) {
                return toast.error(`${title} is a question already!`)
            }
            const newData = { question: currentElmId, answers: [id] };
            setQuestionAndAnsGroupedData([...questionAndAnswerGroupedData, newData]);
        }
    };




    return (
        <>
            <Row>
                <h6>Select Type</h6>
                <Col>
                    <select
                        onChange={(e) => {
                            console.log("Select Type", e.target.value)
                            setSelectedType(e.target.value)
                        }}
                        className="select border-0 bg-white rounded w-100 h-100"
                        id="font-sizing"
                    >
                        <option>Select...</option>
                        <option value={question}>Question</option>
                        <option value={answer}>Answers</option>
                    </select>
                </Col>

            </Row>

            {selectedType === question &&
                <>
                    <hr />
                    <Row>
                        <h6>Answers</h6>
                        <Col>
                            <select
                                onChange={(e) => {
                                    console.log("Selected Answers", e.target.value)
                                    handleSelectTypeChange(e.target.value)
                                }}
                                className="select border-0 bg-white rounded w-100 h-100"
                                id="font-sizing"
                            >
                                <option>Select...</option>
                                {elements.map(element => (
                                    <Option id={element.id} className={element.className} element={element} />
                                ))}
                            </select>
                        </Col>

                    </Row>
                </>

            }
        </>
    );
}

export default SelectAnsAndQuestion;