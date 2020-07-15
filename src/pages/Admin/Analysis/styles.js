import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
 
    padding-bottom: 30px;
    
    canvas{
        width: 980px !important; 
        height: 500px !important;
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
    }
`;

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    label{
        margin: 0 10px;
    }

    input, button{
        /* padding: 10px; */
        margin: 0 5px;
    }
`;
