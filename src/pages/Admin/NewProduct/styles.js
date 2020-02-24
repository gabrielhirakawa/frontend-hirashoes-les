import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1b262c;
    height: 80vh;
`;

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    input, button, textarea{
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        margin: 10px;
    }

    button{
        color: #fff;
        background-color: #0c7b93;
    }
`;