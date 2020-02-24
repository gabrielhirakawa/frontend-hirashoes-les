import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;

    h1{
        margin-bottom: 20px;
    }  
`
export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 300px;

    input{
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        margin: 5px 0px;
    }
`;

export const ButtonUpdate = styled.button`
    background-color: #27496d;
    margin-top: 10px;
    width: 100%;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-weight: bold;

    &:hover{
        background-color: #0c7b93;
    }
`;
