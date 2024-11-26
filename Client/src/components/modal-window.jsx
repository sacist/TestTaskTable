import React, { useState } from "react";
import styled from "styled-components";
import { createEntry,getAllEntries,updateEntry } from "../api/job-api-functions";
const Modal = ({ onClose, setEntries, initialData = {}, isEditing = false }) => {
    const [company, setCompany] = useState(initialData?.company || "");
    const [vacancy, setVacancy] = useState(initialData?.vacancy || "");
    const [salaryRange, setSalaryRange] = useState(
      initialData?.salaryRange || { min: null, max: null, currency: "USD" }
    );
    const [responseStatus, setResponseStatus] = useState(initialData?.responseStatus || "");
    const [notes, setNotes] = useState(initialData?.notes || "");
    
  
    const onChangeHandler = (input, e) => {
      const value = e.target.value;
      switch (input) {
        case "company":
          setCompany(value);
          break;
        case "vacancy":
          setVacancy(value);
          break;
        case "responseStatus":
          setResponseStatus(value);
          break;
        case "notes":
          setNotes(value);
          break;
      }
    };
  
    const salaryRangeHandler = (e) => {
      const { name, value } = e.target;
      setSalaryRange((prevState) => ({
        ...prevState,
        [name]: name === "currency" ? value : +value,
      }));
    };
  
    const entrySaveHandler = async (id) => {
      if (isEditing) {
       await updateEntry(company, vacancy, salaryRange, responseStatus, notes,id)
      } else {
        await createEntry(company, vacancy, salaryRange, responseStatus, notes);
      }
  
      onClose();
      const res = await getAllEntries();
      setEntries(res);
    };
  
    return (
      <Overlay>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h2>{isEditing ? "Edit Job Entry" : "Add Job Entry"}</h2>
          <form>
            <InputGroup>
              <Label>Company</Label>
              <Input
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => onChangeHandler("company", e)}
              />
            </InputGroup>
  
            <InputGroup>
              <Label>Vacancy</Label>
              <Input
                type="text"
                placeholder="Enter vacancy"
                value={vacancy}
                onChange={(e) => onChangeHandler("vacancy", e)}
              />
            </InputGroup>
  
            <InputGroup>
              <Label>Salary Range</Label>
              <div style={{ display: "flex", gap: "10px" }}>
                <Input
                  type="number"
                  placeholder="Min"
                  name="min"
                  value={salaryRange.min || ""}
                  onChange={salaryRangeHandler}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  name="max"
                  value={salaryRange.max || ""}
                  onChange={salaryRangeHandler}
                />
              </div>
              <Select
                name="currency"
                value={salaryRange.currency || ""}
                onChange={salaryRangeHandler}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
            </InputGroup>
  
            <InputGroup>
              <Label>Response Status</Label>
              <Input
                type="text"
                placeholder="Enter response status"
                value={responseStatus}
                onChange={(e) => onChangeHandler("responseStatus", e)}
              />
            </InputGroup>
  
            <InputGroup>
              <Label>Notes</Label>
              <Notes
                placeholder="Enter notes"
                value={notes || ''}
                onChange={(e) => onChangeHandler("notes", e)}
              />
            </InputGroup>
          </form>
          <SubmitButton onClick={()=>{entrySaveHandler(initialData?._id)}}>
            {isEditing ? "Save Changes" : "Add Entry"}
          </SubmitButton>
        </ModalContainer>
      </Overlay>
    );
  };

export const ModalWindow = ({setEntries,setIsModalOpen,isModalOpen,isEditing,initialData,setIsEditing,setEditingEntry}) => {
    const onCloseHandler=() => {
      setIsModalOpen(false)
      setIsEditing(false)
      setEditingEntry(null)
    }
    const onClickHandler=() => {
        setIsModalOpen(true)
        setIsEditing(false)
        setEditingEntry(null)
      } 
  return (
    <div>
      <OpenModalButton onClick={onClickHandler}>
        Add
      </OpenModalButton>
      {isModalOpen && <Modal onClose={onCloseHandler}
       openModal={setIsModalOpen} setEntries={setEntries} isEditing={isEditing} initialData={initialData}/>}
    </div>
  );
};


    const Overlay = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    
    const ModalContainer = styled.div`
      background: white;
      width: 400px;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      display: flex;
      flex-direction: column;
    `;
    
    const CloseButton = styled.button`
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    `;
    
    const InputGroup = styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    `;
    
    const Label = styled.label`
      margin-bottom: 5px;
      font-size: 14px;
      color: #333;
    `;
    
    const Input = styled.input`
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      
    `;
    const Notes = styled.textarea`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  `;
    
    const Select = styled.select`
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 385px;
      margin-top: 5px;
    `;
    const OpenModalButton = styled.button`  
    padding: 5px 10px;
    font-size: 14px;
    background-color: #00df55;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
    background-color:#00993b;
    }
    `;
const SubmitButton=styled.button`
    font-size: 24px;
    background-color: #007bff;
    color: white;
    align-self:center;
    outline: none;
    border-radius: 6px;
    padding:7px 7px;
`