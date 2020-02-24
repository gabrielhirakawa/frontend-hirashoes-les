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
    height: 80vh;

    h1{
        margin-bottom: 20px;
    }
`;

export const PaymentArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0px;
    color: #fff;
    width: 750px;
    border-radius: 4px;
    margin-top: 20px;
    color: #1b262c;
    background-color: #fff;
`;

export const PaymentRadio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        align-items: center;
        margin: 10px;
    }
`;

export const Card = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    width: 400px;
    input,select{
        border: 1px solid #c1c1c1;
        padding: 10px;
        border-radius: 4px;
        width: 100%;
        margin: 10px 0px;
    }

    select{
        font-size: 18px;
    }

    div{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
            width: 45%;
        }
    }
`;

export const SaveCard = styled.span`
    display: flex;
    align-items: center;
    justify-content: center !important;
`;

export const PayButton = styled.button`
    margin-top: 20px;
    border: none;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    background-color: #27496d;
    color: #fff;

    &:hover{
        background-color: #0c7b93; 
    }
`;