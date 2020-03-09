import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1b262c;
    height: 80vh;

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
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        color: #1b262c;

        th, td{
            padding: 10px;
        }
    }
    
`;

export const InputSearch = styled.input`
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    border: none;
    margin-bottom: 20px;
`;

