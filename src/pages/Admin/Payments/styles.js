import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    div{
        display: flex;
        align-items: center;

        svg{
            margin-left: 10px;
        }
    }

    input{
        margin: 20px 0px;
        padding: 10px;
        border: none;
        border-radius: 4px;
    }

    table{
       width: 850px;
       background-color: #fff;
   }
`;

export const Cards = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    
    div{
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        color: #000;
        span{
            margin: 5px 0;
        }
    }

`;

export const Test = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: rgba(0, 0 ,0 , 0.7);
    z-index: 2;

        
`;

export const Modal = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: #fff;
        width: 650px;
        height: 350px;
        h3{
             color: #c1c1c1;   
    }
    button{
        margin-top: 20px;
    }
    
`;

export const StatusEntrega = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #000;

    label, button{
        margin: 0px !important;
    }
`;

export const StatusStep = styled.select`
    color: #000;
    font-size: 16px;
    border-radius: 4px;
    margin: 5px;
`;

