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
`

export const DetailItem = styled.table`
    margin-top: 30px;
    background-color: #c1c1c1;
    color: #1b262c;
    border-radius: 4px;
    padding: 10px;
    text-align: left;
    width: 100%;

    h2{
        text-align: center;
    }

    table{
        width: 100%;
    }

    th, td{
        padding: 10px;
        border: 1px solid #1b262c; 
    }

    div{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
    }
`;

export const Table = styled.table`
    background-color: #fff;
    color: #1b262c;
    border-radius: 4px;
    
    th, td{
        padding: 10px;
        border: 1px solid #1b262c; 
    }

    button{
        border: none;
        background: transparent;
    }
`