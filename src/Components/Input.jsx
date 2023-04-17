import React, { useState } from "react";
import { styled } from "@mui/system";


const FieldContent = styled("div")({
    paddingLeft: "0.5rem",
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "1rem",
})


const FieldOptions = styled("div")({
    paddingLeft: "0.5rem",
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "1rem",
})


const RequiredBtn = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
})

const RequiredBtnSlider = styled("span")({
    display: "flex",
    borderRadius: "5rem",
    height: "22px",
    aspectRatio: "1.5/1",
    padding: "3px",
    transition: "all 0.1s ease-in-out",
})


const ObjectFieldWrapper = styled("div")({
    width: "100%",
    paddingLeft: "1rem",
})




const Input = ({ field, fieldIndex, setFeildsData }) => {
  const [inputData, setInputData] = useState(field);

  const Options = ["String", "Number", "Boolean", "Object"];
  const HandleFieldNameChange = (e) => {
    setInputData({ ...inputData, name: e.target.value });
    setFeildsData(inputData, fieldIndex);
  };
  const HandleTypeChange = (e) => {
    const type = e.target.value;
    if (type === "Object") {
      setInputData({
        ...inputData,
        type: type,
        objectData: [{ name: "addName", type: "String", required: false }],
      });
    } else {
      if (inputData.objectData) {
        delete inputData.objectData;
      }
      setInputData({ ...inputData, type: type });
    }
    setFeildsData(inputData, fieldIndex);
  };
  const HandleRequiredChange = () => {
    setInputData({ ...inputData, required: !inputData.required });
    setFeildsData(inputData, fieldIndex);
  };
  const HandleDeleteField = () => {
    setFeildsData("deleteField", fieldIndex);
  };
  const HandleFieldsdata = (fobjectFeldData, objectFieldIndex) => {
    if (inputData === "deleteField") {
      const newCreatedFields = [...inputData.objectData];
      newCreatedFields.splice(objectFieldIndex, 1);
      setInputData({ ...inputData, objectData: newCreatedFields });
      setFeildsData(inputData, fieldIndex);
    } else {
      const newCreatedFields = [...inputData.objectData];
      newCreatedFields[objectFieldIndex] = fobjectFeldData;
      setInputData({ ...inputData, objectData: newCreatedFields });
      setFeildsData(inputData, fieldIndex);
    }
  };

  const HandleAddObjectField = () => {
    setInputData({
      ...inputData,
      objectData: [
        ...inputData.objectData,
        { name: "addName", type: "String", required: false },
      ],
    });
    setFeildsData(inputData, fieldIndex);
  };
  return (
    <div className="wrapper">
      <FieldContent className="input-content" >
        <h2>{fieldIndex + 1}.</h2>
        <span>
          <div className="name-type-wrapper">
            <input
              type="text"
              value={inputData.name}
              onChange={(e) => HandleFieldNameChange(e)}
            />
            <select
              name="type"
              value={inputData.type}
              onChange={(e) => HandleTypeChange(e)}
            >
              {Options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <FieldOptions className="options">
            <RequiredBtn
              onClick={() => HandleRequiredChange()}
            >
              Required:
              <RequiredBtnSlider
                style={{
                  justifyContent: inputData.required
                    ? "flex-end"
                    : "flex-start",
                  backgroundColor: inputData.required ? "#aa068c" : "#252525",
                }}
                className="required-btn-slider"
              >
                {" "}
                <span />{" "}
              </RequiredBtnSlider>
            </RequiredBtn>
            {inputData.type === "Object" && (
              <button
                className="add-btn"
                onClick={() => HandleAddObjectField()}
              >
                +
              </button>
            )}
            <button onClick={() => HandleDeleteField()}> Delete</button>
          </FieldOptions>
        </span>
      </FieldContent>
      {inputData.type === "Object" &&
        inputData.objectData.length > 0 &&
        inputData.objectData.map((objectField, objectFieldIndex) => (
          <ObjectFieldWrapper  key={objectFieldIndex}>
            <Input
              field={objectField}
              fieldIndex={objectFieldIndex}
              key={objectFieldIndex}
              setFeildsData={(val, fIndex) => HandleFieldsdata(val, fIndex)}
            />
          </ObjectFieldWrapper>
        ))}
    </div>
  );
};

export default Input;
