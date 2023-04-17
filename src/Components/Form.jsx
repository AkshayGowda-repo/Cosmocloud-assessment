import React, { useState } from 'react'
import Input from './Input';
import { styled } from "@mui/system";

const Container = styled("div")({
    display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "2rem",
  textAlign: "center",
  border: "1px solid #ccc",
  borderRadius: "7px",
  backgroundColor:"#fff",
})



const Wrapper = styled("div")({
    width: "100%",
    backgroundColor:"#f5f5f5",
    borderRadius: "5px",
    padding: "1rem",
    minWidth:"35rem",
})



const FieldsWrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#f5f5f5",
})




const Form = () => {
  const [CreatedInputs, setCreatedInputs] = useState([]);

  const HandleAddInput = () => {
    setCreatedInputs(
      [...CreatedInputs, 
      { name: "addName", type: "String", required: false }]
      )
  }

  const HandleInputsdata = (fieldData,fIndex) => {
    const newCreatedInputs = [...CreatedInputs]
if (fieldData === "deleteField" ) {
  newCreatedInputs.splice(fIndex, 1)

}else{
  newCreatedInputs[fIndex] = fieldData
}
setCreatedInputs(newCreatedInputs)
  }
  return (
    <Container >
      <Wrapper className="wrapper">
        <span><h5>Field name and type </h5> <button className='add-btn' onClick={() => HandleAddInput()}>+</button></span>
        <FieldsWrapper  >
          {CreatedInputs.map((field, fieldIndex) => (
           <Input field={field} fieldIndex={fieldIndex} key={fieldIndex} setFeildsData={(fieldData,fIndex)=>HandleInputsdata(fieldData,fIndex)}/>

          ))}
        </FieldsWrapper>

      </Wrapper>
    </Container>
  )
}

export default Form