import axios from 'axios';
import { Note, CreateNoteDTO } from '@/types/note';

const BASE_URL = 'https://your-api-url.com';

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get(`${BASE_URL}/notes`);
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get(`${BASE_URL}/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDTO): Promise<Note> => {
  const { data } = await axios.post(`${BASE_URL}/notes`, note);
  return data;
};