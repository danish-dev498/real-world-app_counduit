import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "./Paginations";
import usePagination from "../hooks/usePagination";
import {
  useFavArticleMutation,
  useGetArticlesQuery,
} from "../services/articleApi";
import { ArticlesSkeleton } from "@/components/articles/ArticlesSkeleton";
import { useAppSelector } from "@/hooks/reduxHooks";
import ArticlePreview from "./ArticlePreview";
import { ArticleProps } from "@/type";

interface FeedProps {
  query: string;
}

const Article = ({ query }: FeedProps) => {
  const [article, setArticles] = useState<ArticleProps[]>([]);
  const [articlesCount, setArticlesCount] = useState();
  const [loading, setLoading] = useState(true);

  const articlePerPage = 10;
  const { totalPages, currentPage, nextPage, prevPage, goToPage } =
    usePagination(articlePerPage, articlesCount);
  let offset = 10 * (currentPage - 1);


  const {
    refetch,
    data: articleData,
    error: articleError,
    isLoading: isArticleLoading,
  } = useGetArticlesQuery(`articles${query}limit=10&offset=${offset}`);

  useEffect(() => {
    setTimeout(() => {
      if (isArticleLoading) return;
      setLoading(false);
      const { articles, articlesCount } = articleData;
      console.log(article);
      setArticles(articles);
      setArticlesCount(articlesCount);
    }, 1500);
  }, [article, articlesCount, isArticleLoading, offset, articleData, query]);

  return (
    <div>
      <div className="mt-6 mb-3">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ArticlesSkeleton key={index} />
          ))
        ) : article.length === 0 ? (
          <h1 className="">No article yet...</h1>
        ) : (
          article.map((data) => (
            <ArticlePreview key={data.slug} articles={data} refetch={refetch} />
          ))
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Article;
