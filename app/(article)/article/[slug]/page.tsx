'use client';
import ArticleDetails from '@/features/articleDetails/components/ArticleDetails';
import { useGetCommentQuery } from '@/features/articleDetails/services/commentApi';
import { useGetArticlesQuery } from '@/features/home/services/articleApi';
const ArticleSlugPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const { refetch, data, isLoading, error } = useGetArticlesQuery(
    `/articles/${slug}`
  );

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useGetCommentQuery(`articles/${slug}/comments`);

  if (isLoading || commentLoading) {
    return <h1 className='flex justify-center'>article loading...</h1>;
  }

  const { article } = data;
  const { comments } = commentData;

  return (
    <ArticleDetails article={article} comments={comments} refetch={refetch} />
  );
};

export default ArticleSlugPage;
