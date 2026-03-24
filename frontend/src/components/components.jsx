import { useRef, useEffect } from "react";


const Button = ({ cls, onClick, type = 'button', children, 
    disabled, style }) => (
    <button className={cls} style={style} type={type} onClick={onClick} 
        disabled={disabled}>
      {children}
    </button>
);


const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit, isFocused, add, sub,
    br=false }) => {
    const inputRef = useRef();
    
    useEffect(() => {
        if (isFocused && inputRef.current) 
        {
            inputRef.current.focus();
        }
    }, [isFocused]);
    return (
        <div>
            <span>Введите номер тренировки</span>
            <form onSubmit={onSearchSubmit}>
                <div className="trainig-num">
                <button onClick={sub} className="trainig-num-button">-</button>
                <input ref={inputRef}
                    value={searchTerm} 
                    onChange={onSearchInput}/>
                <button onClick={add} className="trainig-num-button">+</button>
                </div>
                {br && <br/>}
                <button type="submit" className="search-button search" 
                    disabled={!searchTerm}>
                    Поиск
                </button>
            </form>
            
        </div>
    );
};

export { Button, SearchForm };
