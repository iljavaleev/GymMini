import { Button, ExcelButton, SearchForm } from "../components/components";
import { useStorageState } from "../customhooks/hooks"
import { List } from "./components";
import { useReducer, useState, useEffect } from "react";
import axios from 'axios';

const formatUrl = (book, number) =>  
    `/api/v1/search?book=${book}&number=${number}`;



const storiesReducer = (state, action) => {
    switch (action.type) 
    {
        case 'TRAINING_FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'TRAINING_FETCH_SUCCESS':
            return { ...state, 
                data: Array.isArray(action.payload) ? action.payload : [], 
                isLoading: false, 
                isError: false };
        case 'TRAINING_FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true };
        default:
            throw new Error();
    }
};


const getTrainingByNumber = async (url) => {
    const result = await axios(url);
    return new Promise((resolve, error) => {
            if (result)
                resolve({ data: { stories: result.data } });
            else
                error(new Error());
        }
    );
}

const Generic = () => {
    const [searchNumberTerm, setSearchNumberTerm] = 
        useStorageState('number', 1);
    const [bookTerm, setBookTerm] = useStorageState('book', '0');

    const [stories, dispatchStories] = useReducer(
        storiesReducer, { data: [], isLoading: false, isError: false });
    
    const [url, setUrl] = useState("");

    const handleSearchSubmit = (event) => {
        if (event.target.value)
            setSearchNumberTerm(searchNumberTerm);   
        
        localStorage.setItem('number', searchNumberTerm);
        localStorage.setItem('book', bookTerm);
        
        setUrl(formatUrl(bookTerm, searchNumberTerm));
        event.preventDefault();
    };
    
    useEffect(() => {
        if (!url)
            return;
        dispatchStories({ type: 'TRAINING_FETCH_INIT' });

        (async () => {
            try
            {
                const result = await getTrainingByNumber(url);
                dispatchStories(
                    { type: "TRAINING_FETCH_SUCCESS", 
                        payload: result.data.stories }
                );
            }
            catch (error)
            {
                dispatchStories({ type: 'TRAINING_FETCH_FAILURE' });
            }
        })();   
       
    }, [url]);

    const handleSearch = (event) => {setSearchNumberTerm(event.target.value);};
    const add = (event) => { setSearchNumberTerm(Number(searchNumberTerm) + 1); 
        event.preventDefault();}
    const sub = (event) => { setSearchNumberTerm(Number(searchNumberTerm) - 1); 
        event.preventDefault();}
    
    return (
        <div id="styled-gen-container">
            <div className="program-choice area">
                <div>
                    <span className="program-search-label">
                        Выберите программу
                    </span><br/>
                    &nbsp;
                    <div >
                        <Button 
                            onClick={() => setBookTerm("0")} 
                            cls={`search-button ${bookTerm === "0" ? "active" : "inactive"}`}>
                                Пауэрлифтинг
                        </Button>
                        <Button
                            onClick={() => setBookTerm("1")} 
                            cls={`search-button ${bookTerm === "1" ? "active" : "inactive"}`}>
                                Похудайка
                        </Button>
                    </div>
                </div>
        
                <div id="styled-search-form">
                    <SearchForm searchTerm={searchNumberTerm} 
                                onSearchSubmit={handleSearchSubmit} 
                                onSearchInput={handleSearch}
                                cls="program-search-label"
                                isFocused
                                add={add}
                                sub={sub}
                                br={true}/>
                </div>
                
            </div>
            <div className="program-search area">
                {stories.isError && <p>Something went wrong ...</p>}
                {stories.isLoading ? ( <p>Loading ...</p> ) : 
                    ( <List list={stories.data} /> )}
                {!stories.data.length ||
                    <ExcelButton data={stories.data} 
                    fileName={`тренировка ${searchNumberTerm}`}>
                        Скачать в excel
                    </ExcelButton>}
            </div>
        </div>
    );
};

export { Generic };