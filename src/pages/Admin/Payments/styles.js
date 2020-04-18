import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;

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
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        color: #1b262c;

        th, td{
            padding: 10px;
        }
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
        height: 280px;
        h3{
             color: #c1c1c1;   
    }
    button{
        margin-top: 20px;
    }
    
`;

