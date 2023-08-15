import React from 'react';
import styled from 'styled-components';


//카테고리 받아오기 ~!
let categoryFilter:string[] = ["간식","사료","미용용품","패션용품","위생용품","식기/급수기","외출용품","장난감/훈련용품","하우스/안전용품"]

const Category = () => {


    return (
        <>
         <CategoryBox>
            {categoryFilter.map((item)=>{
                return (
                    <ul>
                    <CategoryItem>{item}</CategoryItem>
                    </ul>
                )

            })}

         </CategoryBox>
        </>
    );
};

export default Category;

const CategoryBox = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
`
const CategoryItem = styled.li`
    margin-left: 1rem;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        scale: 1.2;
        text-decoration: underline;
          text-underline-offset : 5px;

    }
`