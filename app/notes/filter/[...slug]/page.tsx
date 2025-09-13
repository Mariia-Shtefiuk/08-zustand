import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes, getCategories, type Tag } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesFilterProps {
  params: Promise<{ slug: string[] }>;
}

type FilterableTag = Exclude<Tag, "All">;

export const dynamicParams = false;
export const revalidate = 900;

export const generateStaticParams = async () => {
  const categories = [...getCategories];
  return categories.map((category) => ({ slug: [category] }));
};

export default async function NotesFilter({ params }: NotesFilterProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const categorySlug = slug[0];

  const category: FilterableTag | undefined =
    categorySlug === "All" ? undefined : (categorySlug as FilterableTag);

  const categories: Tag[] = [...getCategories];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, category }],
    queryFn: () => fetchNotes("", 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} categories={categories} />
    </HydrationBoundary>
  );
}
