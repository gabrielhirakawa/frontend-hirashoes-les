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
        margin: 20px 0;
    }
`;

export const PaymentArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 20px;
    color: #fff;
    width: 900px;
    border-radius: 4px;
    margin-bottom: 50px;
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

export const CardsQuantity = styled.div`
    button{
        padding: 10px;
    }
`;

export const TwoCards = styled.div`
    display: flex;
`;

export const Card = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
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
        
    }
`;

export const DivExpirationCard = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
            width: 30%;
        }
`;

export const DivCupons = styled.div`
        display: flex;
        width: 700px;
        justify-content: space-between;
        margin-bottom: 50px;

        div{
            display: flex;
            align-items: center;
            flex-direction: column;

            div{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
                label{
                    margin: 0px 5px;
                }
            }
       }

        select{
            width: 250px;
            height: 38px;
        }
`;

export const DivCupom = styled.div`
        width: 250px;
        
        
        input{
            width: 70%;
            height: 38px;
        }
        button{
            height: 38px;
            width: 30%;
            border: none;
            background-color: #27496d;
            color: #fff;

        &:hover{
            background-color: #0c7b93; 
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
    width: 400px;
    background-color: #27496d;
    color: #fff;

    &:hover{
        background-color: #0c7b93; 
    }
`;

export const PayButtonTwoCards = styled.button`
    margin-top: 20px;
    border: none;
    padding: 10px;
    border-radius: 4px;
    width: 250px;
    background-color: #27496d;
    color: #fff;

    &:hover{
        background-color: #0c7b93; 
    }
`;

export const LabelTotal = styled.label`
    font-size: 24px;
`;

export const Enderecos = styled.ul`
    list-style-type: none;
    width: 700px;
    
    li{
        border-radius: 4px;
        display: flex;
        align-items: center;
        background-color: #c1c1c1;
        /* color: #fff; */
        font-weight: bold;
        padding: 15px;
        margin: 10px 0;

        input{
            border: 1px solid #c1c1c1;
            margin-right: 5px;
        }
    }
`;

export const FormEndereco = styled.form`
    width: 700px;
    margin-bottom: 20px;
    div{
        display: flex;
        justify-content: space-between;
        input{
            width: 49%;
        }
    }
    input{
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        box-shadow: none;
        margin: 10px 0;
        padding: 10px;
        width: 100%;
    }
`;

export const Cep = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    input{
        width: 70% !important;
        border-radius: 0px;
    }

    button{
        padding: 10px !important;
        /* height: 36px; */
        border: none;
        width: 30% !important;
        background-color: #27496d; 
        &:hover{
        background-color: #0c7b93;
    }
    }
`;

export const Separator = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border-bottom: 1px solid #c1c1c1;
`;