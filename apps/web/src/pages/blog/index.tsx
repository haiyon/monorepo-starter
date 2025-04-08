import { useState } from 'react';

import { Calendar, Tag, User, Clock, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

export default function BlogPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with the Monorepo Starter Kit',
      excerpt:
        'Learn how to set up and configure your first project using our comprehensive monorepo starter kit.',
      date: '2025-03-15',
      author: 'John Doe',
      readTime: 5,
      tags: ['Getting Started', 'Tutorial'],
      slug: 'getting-started-with-monorepo',
      image: 'https://via.placeholder.com/800x450?text=Monorepo+Starter'
    },
    {
      id: 2,
      title: 'Advanced Component Patterns with Shadcn UI',
      excerpt:
        'Explore advanced component composition techniques and learn how to build reusable UI elements with Shadcn UI.',
      date: '2025-03-01',
      author: 'Jane Smith',
      readTime: 8,
      tags: ['Components', 'UI Design', 'Advanced'],
      slug: 'advanced-component-patterns',
      image: 'https://via.placeholder.com/800x450?text=Advanced+Components'
    },
    {
      id: 3,
      title: 'Optimizing Performance in React Applications',
      excerpt:
        'Discover practical techniques to improve the performance of your React applications, from code splitting to memoization.',
      date: '2025-02-20',
      author: 'Mike Johnson',
      readTime: 10,
      tags: ['Performance', 'React', 'Optimization'],
      slug: 'optimizing-react-performance',
      image: 'https://via.placeholder.com/800x450?text=React+Performance'
    },
    {
      id: 4,
      title: 'Implementing i18n in Your Monorepo Project',
      excerpt:
        'A step-by-step guide to adding multi-language support to your application using i18next and React.',
      date: '2025-02-10',
      author: 'Sarah Chen',
      readTime: 7,
      tags: ['i18n', 'Internationalization', 'Tutorial'],
      slug: 'implementing-i18n-monorepo',
      image: 'https://via.placeholder.com/800x450?text=i18n+Guide'
    },
    {
      id: 5,
      title: 'State Management Strategies for Modern React',
      excerpt:
        'Compare different state management approaches and learn which one to choose for your specific use case.',
      date: '2025-01-25',
      author: 'Alex Turner',
      readTime: 12,
      tags: ['State Management', 'React', 'Advanced'],
      slug: 'state-management-strategies',
      image: 'https://via.placeholder.com/800x450?text=State+Management'
    },
    {
      id: 6,
      title: 'Building Accessible Components from Scratch',
      excerpt:
        'Learn how to create fully accessible UI components that work for everyone, regardless of ability.',
      date: '2025-01-15',
      author: 'Taylor Williams',
      readTime: 9,
      tags: ['Accessibility', 'UI Design', 'Best Practices'],
      slug: 'accessible-components',
      image: 'https://via.placeholder.com/800x450?text=Accessibility'
    }
  ];

  // Popular tags derived from blog posts
  const popularTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 8);

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className='py-16 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{t('blog.title')}</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            {t('blog.subtitle')}
          </p>
          <div className='max-w-xl mx-auto'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                type='text'
                placeholder={t('blog.search.placeholder')}
                className='pl-10'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-8'>
              {filteredPosts.length > 0 ? (
                <div className='space-y-8'>
                  {filteredPosts.map(post => (
                    <Card key={post.id} className='overflow-hidden border border-border/50'>
                      <div className='aspect-video bg-muted overflow-hidden'>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                      <CardHeader className='pt-6'>
                        <div className='space-y-2'>
                          <div className='flex flex-wrap gap-2'>
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant='secondary' className='font-normal'>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Link
                            to={`/blog/${post.slug}`}
                            className='inline-block hover:text-primary transition-colors'
                          >
                            <h2 className='text-2xl font-bold'>{post.title}</h2>
                          </Link>
                          <p className='text-muted-foreground'>{post.excerpt}</p>
                        </div>
                      </CardHeader>
                      <CardFooter className='pt-0 pb-6 flex flex-wrap justify-between gap-4'>
                        <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-1' />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className='flex items-center'>
                            <User className='h-4 w-4 mr-1' />
                            <span>{post.author}</span>
                          </div>
                          <div className='flex items-center'>
                            <Clock className='h-4 w-4 mr-1' />
                            <span>
                              {post.readTime} {t('blog.post.min_read')}
                            </span>
                          </div>
                        </div>
                        <Button asChild variant='outline' size='sm'>
                          <Link to={`/blog/${post.slug}`}>{t('blog.post.read_more')}</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 border border-border/50 rounded-lg bg-muted/10'>
                  <p className='text-xl font-medium mb-2'>{t('blog.no_posts')}</p>
                  <p className='text-muted-foreground mb-4'>{t('blog.no_posts.description')}</p>
                  <Button variant='outline' onClick={() => setSearchQuery('')}>
                    {t('blog.clear_search')}
                  </Button>
                </div>
              )}

              {/* Pagination */}
              <Pagination className='mt-8'>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href='#' />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href='#' isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href='#'>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href='#'>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href='#' />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-4 space-y-8'>
              {/* Popular Tags */}
              <Card className='border border-border/50'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{t('blog.sidebar.popular_tags')}</h3>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {popularTags.map((tag, index) => (
                      <Button
                        key={index}
                        variant='outline'
                        className='rounded-full'
                        onClick={() => setSearchQuery(tag)}
                      >
                        <Tag className='h-3.5 w-3.5 mr-1' />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className='border border-border/50'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{t('blog.sidebar.newsletter')}</h3>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {t('blog.sidebar.newsletter.description')}
                  </p>
                  <div className='space-y-4'>
                    <Input placeholder={t('public.landing.newsletter.placeholder')} />
                    <Button className='w-full'>{t('blog.sidebar.newsletter.button')}</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Post */}
              <Card className='border border-border/50'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{t('blog.sidebar.featured_post')}</h3>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='aspect-video bg-muted overflow-hidden rounded-md'>
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <h4 className='font-medium'>{blogPosts[0].title}</h4>
                  <p className='text-sm text-muted-foreground'>{blogPosts[0].excerpt}</p>
                  <Button asChild variant='link' className='px-0'>
                    <Link to={`/blog/${blogPosts[0].slug}`}>{t('blog.post.read_more')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
