import styled from 'styled-components';


// const StyledContainer = styled.div`
//     max-inline-size: 1080px;
//     margin-inline: auto;
// `;


const StyledChiled = styled.div`
    .area
    {   
        border-radius: 20px;
        background-color: #030311eb;
        padding: 1.5em;
        border: 3px solid #3b347491;
       
    }

    input
    {
        border: 1px solid #06162d91;
        border-radius: 10px;
        color: #333;
        background-color: #f1ebebec;
        cursor: pointer;
        transition: border-color 0.3s ease;
    }

    input:focus 
    {
        border-color: #007bff;
        outline: none;
    }

    button
    {
        background-color: #f1ebebec;
        color: white;
        padding: 0.8em 1.2em;
        border: none;
        border-radius: 10px; 
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover {
        transform: translateY(-2px);
    }
`;


export { StyledChiled, StyledContainer};