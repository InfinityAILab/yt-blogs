// blogService.ts
import { supabase } from '../supabase/supabaseClient';
import { toast } from "sonner"


export interface waitingUser {
  id: string;
  name?: string | null;
  email?: string | null;
  created_at?: string;
}

export const createNewWaitingUser = async (name: string, email: string): Promise<any> => {

  const { data, error } = await supabase
    .from('waitingUsers')
    .insert([{ name, email }])
    .select();

  if (error) {
    return toast.error(error?.message)
  } else {
    return data[0]
  }
};

export const isExistingWaitingUser = async (email: string): Promise<any> => {
  // Check if email already exists
  const { data: existingWaitingUser } = await supabase
    .from('waitingUsers')
    .select('*')
    .eq('email', email)
    .single();

  return existingWaitingUser;
};
