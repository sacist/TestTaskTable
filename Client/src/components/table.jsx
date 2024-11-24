import styled from "styled-components"
import { ModalWindow } from "./modal-window";
import { getAllEntries,deleteEntry } from "../api/job-api-functions";
import { useState, useEffect } from "react";
export const EntryTable = () => {
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const onEdit = (entry) => {
        setEditingEntry(entry)
        setIsEditing(true)
        setIsModalOpen(true)
    }
    const onDelete = async (entry) => {
        await deleteEntry(entry._id)
        const res = await getAllEntries();
        setEntries(res);
    }
    useEffect(() => {
        (async () => {
            const res = await getAllEntries();
            setEntries(res);
        })();
    }, []);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Company</TableHeader>
                        <TableHeader>Vacancy</TableHeader>
                        <TableHeader>Salary Range</TableHeader>
                        <TableHeader>Response Status</TableHeader>
                        <TableHeader>Notes</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((elem) => (
                        <TableRow key={elem._id}>
                            <TableCell>{elem.company}</TableCell>
                            <TableCell>{elem.vacancy}</TableCell>
                            <TableCell>{`${elem.salaryRange.min} - ${elem.salaryRange.max} ${elem.salaryRange.currency}`}</TableCell>
                            <TableCell>{elem.responseStatus}</TableCell>
                            <NotesCell>{elem.notes}</NotesCell>
                            <TableCell>
                                <EditButton onClick={() => { onEdit(elem) }}>
                                    Edit
                                </EditButton>
                                <DeleteButton onClick={()=>onDelete(elem)}>Delete</DeleteButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>

            </Table>
            <ModalWindow setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}
                setEntries={setEntries} isEditing={isEditing} initialData={editingEntry} setIsEditing={setIsEditing}
                setEditingEntry={setEditingEntry}>
            </ModalWindow>
        </div>
    );
};

const EditButton = styled.button`
        padding: 5px 10px;
        font-size: 14px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
        background-color: #0056b3;
        }
    `;
const DeleteButton = styled.button`
        padding: 5px 10px;
        font-size: 14px;
        background-color: #ce0000;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
        background-color: #660101;
        }
        margin-left: 40px;
    `;


const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    `;

const TableHeader = styled.th`
    background-color: #f5f5f5;
    color: #333;
    padding: 12px 15px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 1;
    `;

const TableRow = styled.tr`
    &:nth-child(even) {
    background-color: #f9f9f9;
    }
    `;

const TableCell = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    vertical-align: top; 
    word-wrap: break-word; 
    word-break: break-word;
    white-space: normal;
    vertical-align: middle;
    `;

const NotesCell = styled(TableCell)`
    width: 200px;
    `;