import {useState, useEffect} from 'react';

const useCounter = (add = true) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
                if (add === true) {
                    return prevCounter + 1
                } else {
                    return prevCounter - 1
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [add]);
    return counter;
};

export default useCounter;


