import { useRef, useEffect } from "react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


const Button = ({ cls, onClick, type = 'button', children, 
    disabled, style }) => (
    <button className={cls} style={style} type={type} onClick={onClick} 
        disabled={disabled}>
      {children}
    </button>
);

const ExcelButton = ({ data, fileName, children }) => { 
    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(fileName);

        // Add columns and data rows
        sheet.columns = [
            { header: 'Упражнение', key: 'exercise' },
            { header: 'Повторения', key: 'reps' },
            { header: 'Подход1', key: 'set1' },
            { header: 'Подход2', key: 'set2' },
            { header: 'Подход3', key: 'set3' },
            { header: 'Подход4', key: 'set4' },
        ];
        data.forEach(item => sheet.addRow(item));

        const buffer = await workbook.xlsx.writeBuffer();
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        saveAs(new Blob([buffer]), `${formattedDate}.xlsx`);
    }
    return <button id="excel-button" className="search-button" onClick={exportExcel}>{children}</button>;
};


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

export { Button, SearchForm, ExcelButton };
