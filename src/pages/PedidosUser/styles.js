import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    table{
       width: 700px;
       background-color: #fff;
   }

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
`

export const DetailItem = styled.div`
    margin: 30px 0;
    background-color: #fff;
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
        img{
            height: 40px;
        }
    }

    div{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
    }
`;

export const CircleStep = styled.div.attrs(props => ({
    ative: props.ative,
  }))`
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    color: #fff;
    background-color: ${props => props.ative ? '#649d66' : ' #c1c1c1'};
    margin: 0 !important;
`;


export const Steps = styled.div`
div{
    display: flex;
    flex-direction: column;
    align-items: center !important;
    justify-content: center !important;
}
`;

