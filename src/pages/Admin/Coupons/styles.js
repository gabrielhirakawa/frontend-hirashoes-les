import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 50px;

   h1{
       margin-top: 50px;
   }    

   table{
       width: 700px;
       background-color: #fff;
   }
`;


export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    
    input, button, select{
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