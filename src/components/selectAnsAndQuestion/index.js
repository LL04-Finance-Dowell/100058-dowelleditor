/* eslint-disable no-unused-vars */
import { Row, Col, Container } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";
import { toast } from "react-toastify";
import { useState } from "react";

export const TEXT_INPUT = "textInput"
export const IMAGE_INPUT = "imageInput"
export const DATE_INPUT = "dateInput"
export const SIGN_INPUT = "signInput"
export const TABLE_INPUT = "tableInput"
export const CONTAINER_INPUT = "containerInput"
export const IFRAME_INPUT = "iframeInput"
export const SCALE_INPUT = "scaleInput"
export const NEW_SCALE_INPUT = "newScaleInput"
export const CAMERA_INPUT = "cameraInput"
export const BUTTON_INPUT = "buttonInput"
export const DROPDOWN_INPUT = "dropdownInput"
export const EMAIL_BUTTON = "emailButton"


const Option = ({ id, className }) => {
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


const SelectAnsAndQuestion = ({ selectedType,
    setSelectedType,
    addedAns,
    setAddedAns
}) => {
    const { questionAndAnswerGroupedData, setQuestionAndAnsGroupedData } = useStateContext()
    // const [addedAns, setAddedAns] = useState([])
    console.log(questionAndAnswerGroupedData, "questionAndAnswerGroupedData");
    const currentElmId = document.querySelector('.focussedd div')?.id ? document.querySelector('.focussedd div')?.id : null
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

    const handleSelectAnswerHelper = (passedData) => {
        const { id, title } = JSON.parse(passedData)
        const questions = new Set();
        const answers = new Set();

        const data = [...questionAndAnswerGroupedData].map(elm => {
            questions.add(elm.question);
            answers.add(...elm.answers);
            return elm;
        });

        if (questions.has(id)
            // || answers.has(id)
        ) {
            return toast.error(`${title} is already a question!`);
        }

        const currentDataAsQuestion = data.find((elm) => elm.question === currentElmId);
        console.log("currentDataAsQuestion", currentDataAsQuestion)

        function checksAnsExistsInQuestion() {
            if (!currentDataAsQuestion) return false;
            if (currentDataAsQuestion.answers.includes(id)) {
                // toast.error(`${title} has already been added has an answer to this question!`);
                return true
            }
            else {
                return false
            }
        }

        function peformStatesUpdates(newData) {
            const result = checksAnsExistsInQuestion()
            if (result) return;
            setAddedAns([...addedAns, title])
            setQuestionAndAnsGroupedData(newData)
        }

        if (currentDataAsQuestion) {
            const newData = { ...currentDataAsQuestion, answers: [...currentDataAsQuestion.answers, id] };
            peformStatesUpdates(data.map(elm => (elm.question === currentElmId ? newData : elm)))
        } else {
            if (currentElmId === id) return;
            if (answers.has(currentElmId)) return;
            const newData = { question: currentElmId, answers: [id] };
            peformStatesUpdates([...questionAndAnswerGroupedData, newData])
        }
    };

    const handleSelectAnswer = (multipleValues) => {
        if (multipleValues?.length === 0) return;

        const passedData = [...multipleValues].map(options => options.getAttribute('value'))

        for (let index = 0; index < passedData?.length; index++) {
            const item = passedData[index];
            handleSelectAnswerHelper(item)
        }
    }

    // const handleSelectQuestionHelper = (passedData) => {
    //     const { id, title } = JSON.parse(passedData)
    //     const questions = new Set();
    //     const answers = new Set();

    //     const data = [...questionAndAnswerGroupedData].map(elm => {
    //         questions.add(elm.question);
    //         answers.add(...elm.answers);
    //         return elm;
    //     });

    //     if (questions.has(id)
    //         // || answers.has(id)
    //     ) {
    //         return toast.error(`${title} is already a question!`);
    //     }

    //     const currentDataAsQuestion = data.find((elm) => elm.question === currentElmId);
    //     console.log("currentDataAsQuestion", currentDataAsQuestion)

    //     function checksAnsExistsInQuestion() {
    //         if (!currentDataAsQuestion) return false;
    //         if (currentDataAsQuestion.answers.includes(id)) {
    //             // toast.error(`${title} has already been added has an answer to this question!`);
    //             return true
    //         }
    //         else {
    //             return false
    //         }
    //     }

    //     function peformStatesUpdates(newData) {
    //         const result = checksAnsExistsInQuestion()
    //         if (result) return;
    //         setAddedAns([...addedAns, title])
    //         setQuestionAndAnsGroupedData(newData)
    //     }

    //     if (currentDataAsQuestion) {
    //         const newData = { ...currentDataAsQuestion, answers: [...currentDataAsQuestion.answers, id] };
    //         peformStatesUpdates(data.map(elm => (elm.question === currentElmId ? newData : elm)))
    //     } else {
    //         if (currentElmId === id) return;
    //         if (answers.has(currentElmId)) return;
    //         const newData = { question: currentElmId, answers: [id] };
    //         peformStatesUpdates([...questionAndAnswerGroupedData, newData])
    //     }
    // };

    // const handleSelectQuestion = (multipleValues) => {
    //     if (multipleValues?.length === 0) return;

    //     const passedData = [...multipleValues].map(options => options.getAttribute('value'))

    //     for (let index = 0; index < passedData?.length; index++) {
    //         const item = passedData[index];
    //         handleSelectQuestionHelper(item)
    //     }
    // }


    const handleDeleteAns = (ans) => {
        if (!currentElmId) return;

        setAddedAns(prevAddedAns => prevAddedAns.filter(item => item !== ans));

        setQuestionAndAnsGroupedData(prevData => {
            return prevData.map(item => {
                if (item.question === currentElmId) {
                    return { ...item, answers: item.answers.filter(item => item !== ans) };
                }
                return item;
            });
        });
    }


    return (
        <>
            {addedAns?.length > 0 &&
                <>
                    <Container fluid>
                        <Row>
                            <Col>
                                <div
                                    className="border px-1 py-1"
                                    style={{
                                        width: "100%",
                                        maxHeight: '150px',
                                        overflowX: 'scroll',
                                        backgroundColor: 'white',
                                    }}>
                                    {[...addedAns].map(ans =>
                                    (<div type="button" class="btn btn-primary mb-2 mt-2">
                                        {ans} <span class="badge bg-secondary" onClick={() => handleDeleteAns(ans)}>X</span>
                                    </div>))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <hr /></>}

            <Row>
                <h6>Select Type</h6>
                <Col>
                    <select
                        onChange={(e) => {
                            console.log("Select Type", e.target.value)
                            setSelectedType(e.target.value);
                        }}
                        className="select border-0 bg-white rounded w-100 h-100"
                        id="font-sizing"
                    >
                        <option>Select...</option>
                        <option value={question}>Question</option>
                        {/* <option value={answer}>Answers</option> */}
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
                                multiple
                                onChange={(e) => {
                                    console.log("Selected Answers", e.target.value)
                                    handleSelectAnswer(e.target.selectedOptions)
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

            {/* {selectedType === answer &&
                <>
                    <hr />
                    <Row>
                        <h6>Questions</h6>
                        <Col>
                            <select
                                multiple
                                onChange={(e) => {
                                    handleSelectQuestion(e.target.selectedOptions)
                                }}
                                className="select border-0 bg-white rounded w-100 h-100"
                                id="font-sizing"
                            >
                                <option>Select...</option>
                                {elements.map(element => (
                                    <Option id={element.id} className={element.className} />
                                ))}
                            </select>
                        </Col>

                    </Row>
                </>

            } */}
        </>
    );
}

export default SelectAnsAndQuestion;