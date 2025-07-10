// utils/session.ts
import { v4 as uuidv4 } from 'uuid';

export function getOrCreateUserSessionId(): string {
  let id = localStorage.getItem('userSessionId');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('userSessionId', id);
  }
  return id;
}

export function reStart_userSession(){
  localStorage.removeItem('userSessionId');
}
