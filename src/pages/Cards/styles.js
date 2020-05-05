import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    

    h1{
        margin-top: 50px;
        margin-bottom: 20px;
    }
`;

export const Cards = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
   
`

export const Card = styled.div`
    display: flex;
    align-items: center;

    svg{
        &:hover{
            color: #c1c1c1;
            cursor: pointer;
        }
    }
`;

export const CardItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 4px;
    color: #1b262c;
    padding: 20px 10px;
    width: 400px;
    margin: 10px;

    img{
        height: 20px;
    }
`

export const AddCard = styled.button`
    margin-top: 20px;
    background-color: #27496d;
    border: none;
    padding: 10px;
    color: #fff;

    &:hover{
        background-color: #0c7b93;
    }
`;

export const FormNewCard = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    input{
        border: none;
        padding: 10px;
        border-radius: 4px;
        width: 100%;
        margin: 10px 0px;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
            width: 30%;
        }
    }
`;

export const SaveCard = styled.button`
    margin-top: 10px;
    margin-bottom: 50px;
    width: 100%;
    background-color: #27496d;
    border: none;
    padding: 10px;
    color: #fff;

    &:hover{
        background-color: #0c7b93;
    }
`;

