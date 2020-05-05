import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    

    h1{
        margin: 30px 0;
    }


    table{
        width: 800px;
       background-color: #fff;

        td{
            svg{
                cursor: pointer;
                &:hover{
                    color: #c1c1c1 !important;
                
                }
            }
        }
    }
    
`;

