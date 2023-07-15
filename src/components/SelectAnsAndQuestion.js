/* eslint-disable no-unused-vars */
import { Row, Col } from "react-bootstrap";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiQuestionMark } from "react-icons/bi";

const TEXT_INPUT = "textInput"
const IMAGE_INPUT = "imageInput"
const DATE_INPUT = "dateInput"
const SIGN_INPUT = "signInput"
const TABLE_INPUT = "tableInput"
const CONTAINER_INPUT = "containerInput"
const IFRAME_INPUT = "iframeInput"
const SCALE_INPUT = "scaleInput"
const NEW_SCALE_INPUT = "newScaleInput"
const CAMERA_INPUT = "cameraInput"
const BUTTON_INPUT = "buttonInput"
const DROPDOWN_INPUT = "dropdownInput"
const EMAIL_BUTTON = "emailButton"


const Option = ({ id, className, element }) => {
    console.log("element", element.className)
    const titleFormat = () => {
        if (className.includes(TEXT_INPUT)) return `TEXT INPUT - ${id}`;
        else if (className.includes(IMAGE_INPUT)) return `IMAGE INPUT - ${id}`
        else if (className.includes(DATE_INPUT)) return `DATE INPUT - ${id}`
        else if (className.includes(SIGN_INPUT)) return `SIGN INPUT - ${id}`
        else if (className.includes(TABLE_INPUT)) return `TABLE INPUT - ${id}`
        else if (className.includes(CONTAINER_INPUT)) return `CONTAINER INPUT - ${id}`
        else if (className.includes(IFRAME_INPUT)) return `IFRAME INPUT - ${id}`
        else if (className.includes(SCALE_INPUT)) return `SCALE INPUT - ${id}`
        else if (className.includes(NEW_SCALE_INPUT)) return `NEW SCALE INPUT  - ${id}`
        else if (className.includes(CAMERA_INPUT)) return `CAMERA INPUT  - ${id}`
        else if (className.includes(BUTTON_INPUT)) return `BUTTON INPUT  - ${id}`
        else if (className.includes(DROPDOWN_INPUT)) return `DROPDOWN INPUT  - ${id}`
        else if (className.includes(EMAIL_BUTTON)) return `EMAIL BUTTON  - ${id}`
        else {
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


const SelectAnsAndQuestion = ({ selectedType, setSelectedType }) => {
    const { questionAndAnswerGroupedData, setQuestionAndAnsGroupedData } = useStateContext()
    console.log(questionAndAnswerGroupedData, "questionAndAnswerGroupedData");
    const currentElmId = document.querySelector('.focussedd div').id
    const elements = [
        ...document.querySelectorAll(`.${TEXT_INPUT}`),
        ...document.querySelectorAll(`.${IMAGE_INPUT}`),
        ...document.querySelectorAll(`.${DATE_INPUT}`),
        ...document.querySelectorAll(`.${SIGN_INPUT}`),
        ...document.querySelectorAll(`.${TABLE_INPUT}`),
        ...document.querySelectorAll(`.${CONTAINER_INPUT}`),
        ...document.querySelectorAll(`.${IFRAME_INPUT}`),
        ...document.querySelectorAll(`.${SCALE_INPUT}`),
        ...document.querySelectorAll(`.${NEW_SCALE_INPUT}`),
        ...document.querySelectorAll(`.${CAMERA_INPUT}`),
        ...document.querySelectorAll(`.${BUTTON_INPUT}`),
        ...document.querySelectorAll(`.${DROPDOWN_INPUT}`),
        ...document.querySelectorAll(`.${EMAIL_BUTTON}`),
    ];
    // const [selectedType, setSelectedType] = useState("")
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