import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1b262c;
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
    /* flex-direction: column; */
    margin-bottom: 20px;
    div{
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        margin: 10px;
        color: #000;
        border-radius: 4px;
        padding: 10px 20px;
        span{
            margin: 5px 0;
        }
    }

`;

