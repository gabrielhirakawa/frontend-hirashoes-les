import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1{
        margin-top: 30px;
        margin-bottom: 20px;
    }  
`
export const FormCadastro = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 700px;

`;

export const ButtonSalvar = styled.button`
    background-color: #27496d;
    margin-top: 30px;
    width: 500px;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-weight: bold;

    &:hover{
        background-color: #0c7b93;
    }
`;

export const ButtonRemover = styled.button`
    background-color: #c3c3c3;
    margin-top: 10px;
    margin-bottom: 50px;
    width: 500px;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-weight: bold;

    &:hover{
        background-color: #0c7b93;
    }
`;

export const Dados = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    input{
        width: 350px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        margin: 5px 0px;
    }
`;

export const DadosUsuario = styled.div`
    margin-right: 20px;
`; 

export const DadosEndereco = styled.div`
    div{
        display: flex;
        justify-content: space-between;
        input{
            width: 170px;
           /* margin-right: 5px; */
        }
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

export const IdUser = styled.input`
    width: 130px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
`;