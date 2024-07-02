// blogService.ts
import { supabase } from '../supabase/supabaseClient';
import { toast } from "sonner"


export interface Blog {
  id?: string;
  title: string | null;
  content?: string | null;
  slug: string;
  created_at?: string;
  author?: string | null;
  uuid?: Number | null;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')

  if (error) {
    toast.error(error?.message)
  }

  return data as Blog[];
};

export const createBlog = async ({title, content, slug, uuid = null, author = null}: Blog): Promise<void> => {

  const { error } = await supabase
    .from('blogs')
    .insert([{ title, content, slug, uuid, author }]);

  if (error) {
    toast.error(error?.message)
  }
};

export const isExistingSlug = async (slug: string): Promise<boolean> => {
  // Check if slug already exists
  const { data: existingSlug } = await supabase
    .from('blogs')
    .select('slug')
    .eq('slug', slug)
    .single();

  return !!existingSlug;
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    toast.error(error?.message)
  }
  return data as Blog | null;
};
