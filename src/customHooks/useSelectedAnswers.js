import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/contextProvider';

function useSelectedAnswer() {
    const [addedAns, setAddedAns] = useState([]);
    const { questionAndAnswerGroupedData } = useStateContext()

    useEffect(() => {
        const currentElement = document.querySelector('.focussedd div');
        if (!currentElement) return;

        const currentElmId = currentElement.id;
        if (!currentElmId) return;

        const item = [...questionAndAnswerGroupedData].find(elm => elm.question === currentElmId);
        if (item) {
            setAddedAns(item.answers);
        }
    }, [questionAndAnswerGroupedData]);

    return { addedAns, setAddedAns };
}

export default useSelectedAnswer;
