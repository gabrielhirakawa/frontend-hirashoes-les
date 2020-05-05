import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    form{
        button {
            border: none;
            background-color: transparent;
        }
    }

    h1{
        margin-bottom: 30px;
    }

    table{
        width: 700px;
       background-color: #fff;
       }
    
`;

export const InputSearch = styled.input`
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    border: none;
    margin-bottom: 20px;
`;

