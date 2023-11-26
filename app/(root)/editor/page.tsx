'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePostArticleMutation } from '@/features/home/services/articleApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

const EditArticle = () => {
  const [newTag, setNewTags] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    body: '',
    tags: tags,
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    body: '',
  });

  const router = useRouter();

  const [articleTrigger, { data, isLoading, error }] = usePostArticleMutation();
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTags(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      const trimValue = newTag.trim();
      setNewTags('');
      if (!tags.includes(trimValue)) {
        setTags([...tags, trimValue]);
      }
    }
  };

  const handleDelete = (deletedTag: string) => {
    console.log('check the delete ', deletedTag);
    const filterData = tags.filter((tag) => tag !== deletedTag);
    setTags(filterData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setArticleData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleArticleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('article data over here', articleData);
    console.log(tags);

    articleTrigger({
      article: {
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        tags: tags,
      },
    }).then((data: any) => {
      console.log(data);

      if (data?.data?.article) {
        router.push('/');
      }
      console.log('Before second if condition');
      // console.log('check the data over hre', data);
      if (data?.error?.status === 422) {
        const { status, data: errorData } = data.error;
        setErrors({
          title: errorData.errors?.title?.length && errorData?.errors?.title[0],
          description:
            errorData?.errors?.description?.length &&
            errorData?.errors?.description[0],
          body: errorData?.errors?.body?.length && errorData?.errors?.body[0],
        });
      }
    });
  };

  // console.log('=================== data========', data);
  // console.log('=================== errors========', error);
  // console.log('=================== isloading========', isLoading);

  // useEffect(() => {
  //   if (error) {
  //     const { status, data: errorData } = error;
  //     if (status === 422) {
  //       console.log('form errror');
  //       setErrors({
  //         title: errorData.errors?.title?.length && errorData?.errors?.title[0],
  //         description:
  //           errorData?.errors?.description?.length &&
  //           errorData?.errors?.description[0],
  //       });
  //     }
  //   }
  // }, [error]);

  console.log(errors);

  console.log('check the error', errors);
  return (
    <div className='flex justify-center'>
      <div className='p-4 flex flex-col  gap-2 container lg:max-w-5xl'>
        <p className='text-red-500 font-semibold'>
          {errors.title
            ? `Title ${errors.title}`
            : errors.description
            ? `Description ${errors.description}`
            : errors.body
            ? `Body ${errors.body}`
            : null}
        </p>
        <Input
          placeholder='Article Title'
          className='py-6'
          name='title'
          value={articleData.title}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Input
          placeholder={`What's the article about?`}
          className='-py-1'
          name='description'
          value={articleData.description}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Textarea
          placeholder='Write your article (in markdown)'
          className='h-48'
          name='body'
          value={articleData.body}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className=''>
          <Input
            className='mb-0.5 disabled:cursor-not-allowed'
            placeholder='Enter Tag'
            value={newTag}
            onChange={handleTagChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className='flex gap-1'>
            {tags.map((tag) => (
              <Badge className='bg-gray-400 flex gap-1.5'>
                <AiOutlineClose
                  onClick={() => handleDelete(tag)}
                  className='text-white'
                />
                <p className='text-white'>{tag}</p>
              </Badge>
            ))}
          </div>
        </div>
        <Button
          className='flex ml-auto   disabled:cursor-not-allowed'
          type='submit'
          onClick={handleArticleSubmit}
          disabled={isLoading}
        >
          Publish Article
        </Button>
      </div>
    </div>
  );
};

export default EditArticle;
