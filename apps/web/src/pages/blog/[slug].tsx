import { useEffect, useState } from 'react';

import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPostDetail() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Sample blog post full content
  const blogPostsContent = {
    'getting-started-with-monorepo': {
      title: 'Getting Started with the Monorepo Starter Kit',
      excerpt:
        'Learn how to set up and configure your first project using our comprehensive monorepo starter kit.',
      date: '2025-03-15',
      author: 'John Doe',
      authorRole: t('common.senior_developer'),
      readTime: 5,
      tags: ['Getting Started', 'Tutorial'],
      image: 'https://placehold.co/1200x600?text=Monorepo+Starter',
      content: `
        <h2>Introduction</h2>
        <p>A monorepo (monolithic repository) is a software development strategy where code for many projects is stored in the same repository. This approach has gained popularity among both large tech companies and smaller teams for its ability to simplify dependency management, code sharing, and coordinated changes.</p>

        <p>Our Monorepo Starter Kit brings together best-in-class tools to give you a solid foundation for your projects. In this guide, we'll walk through the process of setting up your first project using our kit.</p>

        <h2>Prerequisites</h2>
        <p>Before we begin, make sure you have the following installed:</p>
        <ul>
          <li>Node.js (v18 or later)</li>
          <li>pnpm (v8 or later)</li>
          <li>Git</li>
        </ul>

        <h2>Step 1: Clone the Repository</h2>
        <p>Start by cloning the Monorepo Starter Kit repository to your local machine:</p>
        <pre><code>git clone https://github.com/haiyon/monorepo-starter.git my-project
cd my-project</code></pre>

        <h2>Step 2: Install Dependencies</h2>
        <p>Once you've cloned the repository, install the dependencies using pnpm:</p>
        <pre><code>pnpm install</code></pre>

        <h2>Step 3: Project Structure</h2>
        <p>Let's take a moment to understand the structure of the monorepo:</p>
        <ul>
          <li><strong>apps/</strong> - Contains individual applications</li>
          <li><strong>packages/</strong> - Contains shared libraries and utilities</li>
          <li><strong>config/</strong> - Contains shared configuration files</li>
        </ul>

        <h2>Step 4: Running the Development Server</h2>
        <p>To start the development server for the web application, run:</p>
        <pre><code>pnpm dev</code></pre>

        <p>This will start the Vite development server, and you should be able to see the application running at http://localhost:5173.</p>

        <h2>Step 5: Creating a New Package</h2>
        <p>One of the benefits of a monorepo is the ability to create shared packages. Let's create a new package:</p>
        <pre><code>mkdir -p packages/my-library
cd packages/my-library</code></pre>

        <p>Create a package.json file:</p>
        <pre><code>{
  "name": "my-library",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --dts",
    "dev": "tsup src/index.ts --dts --watch"
  }
}</code></pre>

        <h2>Step 6: Adding the New Package as a Dependency</h2>
        <p>To use your new package in one of the applications, you can add it as a dependency:</p>
        <pre><code>cd apps/web
pnpm add my-library@workspace:*</code></pre>

        <h2>Conclusion</h2>
        <p>You've now set up your first project using the Monorepo Starter Kit! This is just the beginning of what you can achieve with this powerful setup. In future tutorials, we'll explore more advanced topics like shared component libraries, testing strategies, and deployment pipelines.</p>

        <p>If you have any questions or run into issues, don't hesitate to reach out to our community or check the documentation.</p>
      `,
      relatedPosts: [2, 4, 5]
    },
    'advanced-component-patterns': {
      title: 'Advanced Component Patterns with Shadcn UI',
      excerpt:
        'Explore advanced component composition techniques and learn how to build reusable UI elements with Shadcn UI.',
      date: '2025-03-01',
      author: 'Jane Smith',
      authorRole: t('common.uiux_specialist'),
      readTime: 8,
      tags: ['Components', 'UI Design', 'Advanced'],
      image: 'https://placehold.co/1200x600?text=Advanced+Components',
      content: `
        <h2>Introduction to Advanced Component Patterns</h2>
        <p>Building reusable and composable UI components is essential for maintaining a scalable and consistent design system. Shadcn UI provides an excellent foundation, but to truly leverage its power, we need to understand advanced component patterns.</p>

        <p>In this article, we'll explore several patterns that will help you create more flexible, maintainable, and reusable components.</p>

        <h2>Compound Components Pattern</h2>
        <p>The Compound Components pattern allows for greater flexibility by breaking a complex component into smaller, related pieces that work together.</p>

        <pre><code>// Example of a compound component
const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Content = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;
  return <div>{children}</div>;
};</code></pre>

        <h2>Render Props Pattern</h2>
        <p>The Render Props pattern provides a way to share code between components using a prop whose value is a function.</p>

        <pre><code>// Example of render props
const Toggle = ({ children }) => {
  const [on, setOn] = useState(false);

  const toggle = () => setOn(!on);

  return children({ on, toggle });
};

// Usage
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>Toggle</button>
      <div>{on ? 'ON' : 'OFF'}</div>
    </div>
  )}
</Toggle></code></pre>

        <h2>Custom Hooks Pattern</h2>
        <p>Creating custom hooks allows you to extract component logic into reusable functions.</p>

        <pre><code>// Custom hook for form validation
function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        // Submit form
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}</code></pre>

        <h2>Putting It All Together</h2>
        <p>By combining these patterns, you can create highly reusable and composable components that are also easy to maintain and extend.</p>

        <p>Remember that the goal is not to use all of these patterns at once, but to choose the right pattern for each specific use case. The best components are those that feel natural and intuitive to use while hiding unnecessary complexity.</p>
      `,
      relatedPosts: [1, 3, 6]
    }
  };

  // Sample blog posts for related posts
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
      image: 'https://placehold.co/800x450?text=Monorepo+Starter'
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
      image: 'https://placehold.co/800x450?text=Advanced+Components'
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
      image: 'https://placehold.co/800x450?text=React+Performance'
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
      image: 'https://placehold.co/800x450?text=i18n+Guide'
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
      image: 'https://placehold.co/800x450?text=State+Management'
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
      image: 'https://placehold.co/800x450?text=Accessibility'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      if (slug && blogPostsContent[slug as keyof typeof blogPostsContent]) {
        const currentPost = blogPostsContent[slug as keyof typeof blogPostsContent];
        setPost(currentPost);

        // Get related posts
        if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
          const related = currentPost.relatedPosts
            .map(id => blogPosts.find(post => post.id === id))
            .filter(Boolean);
          setRelatedPosts(related);
        }
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='animate-pulse'>
          <div className='h-10 bg-muted rounded w-3/4 mb-4'></div>
          <div className='h-4 bg-muted rounded w-1/4 mb-8'></div>
          <div className='h-96 bg-muted rounded mb-8'></div>
          <div className='h-4 bg-muted rounded w-full mb-2'></div>
          <div className='h-4 bg-muted rounded w-full mb-2'></div>
          <div className='h-4 bg-muted rounded w-2/3 mb-8'></div>
          <div className='h-4 bg-muted rounded w-full mb-2'></div>
          <div className='h-4 bg-muted rounded w-full mb-2'></div>
          <div className='h-4 bg-muted rounded w-3/4 mb-8'></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-3xl font-bold mb-4'>{t('docs.not_found')}</h1>
        <p className='text-muted-foreground mb-8'>{t('docs.not_found.description')}</p>
        <Button asChild>
          <Link to='/blog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            {t('docs.back_to_docs')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className='py-12 bg-muted/30'>
        <div className='container mx-auto px-4'>
          <Button asChild variant='ghost' className='mb-6'>
            <Link to='/blog'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              {t('blog.post.previous')}
            </Link>
          </Button>

          <div className='flex flex-wrap gap-2 mb-4'>
            {post.tags.map((tag: string, index: number) => (
              <Badge key={index} variant='secondary' className='font-normal'>
                <Tag className='h-3.5 w-3.5 mr-1' />
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>

          <p className='text-xl text-muted-foreground mb-6'>{post.excerpt}</p>

          <div className='flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground'>
            <div className='flex items-center'>
              <Calendar className='h-4 w-4 mr-1' />
              <span>
                {t('blog.post.last_updated')}: {formatDate(post.date)}
              </span>
            </div>
            <div className='flex items-center'>
              <User className='h-4 w-4 mr-1' />
              <span>
                {t('blog.post.author')}: {post.author}
              </span>
            </div>
            <div className='flex items-center'>
              <Clock className='h-4 w-4 mr-1' />
              <span>
                {post.readTime} {t('blog.post.min_read')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className='w-full h-[400px] md:h-[500px] bg-muted overflow-hidden'>
        <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
      </div>

      {/* Content */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-8'>
              <div className='prose prose-neutral dark:prose-invert max-w-none'>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Article Footer */}
              <div className='mt-12 pt-6 border-t'>
                <div className='flex flex-wrap justify-between gap-4'>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <Share className='h-4 w-4 mr-2' />
                      {t('blog.post.share')}
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Bookmark className='h-4 w-4 mr-2' />
                      {t('blog.post.save')}
                    </Button>
                  </div>
                  <div>
                    <Button variant='outline' size='sm'>
                      <MessageSquare className='h-4 w-4 mr-2' />
                      {t('blog.post.leave_comment')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className='mt-8 p-6 bg-muted/50 rounded-lg'>
                <div className='flex items-start gap-4'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/micah/svg?seed=${post.author}`}
                    />
                    <AvatarFallback>
                      {post.author
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='text-lg font-semibold'>{post.author}</h3>
                    <p className='text-sm text-muted-foreground mb-2'>{post.authorRole}</p>
                    <p className='text-sm'>{t('blog.post.author_bio')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-4 space-y-8'>
              {/* Related Posts */}
              <Card className='border border-border/50'>
                <CardContent className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>{t('blog.post.related')}</h3>
                  <div className='space-y-6'>
                    {relatedPosts.map((relatedPost, index) => (
                      <div key={index} className='flex gap-4'>
                        <div className='w-20 h-20 bg-muted overflow-hidden rounded flex-shrink-0'>
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div>
                          <h4 className='font-medium leading-tight mb-1'>
                            <Link
                              to={`/blog/${relatedPost.slug}`}
                              className='hover:text-primary transition-colors'
                            >
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <p className='text-xs text-muted-foreground'>
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className='border border-border/50'>
                <CardContent className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>{t('blog.sidebar.popular_tags')}</h3>
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant='secondary' className='px-3 py-1'>
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant='secondary' className='px-3 py-1'>
                      React
                    </Badge>
                    <Badge variant='secondary' className='px-3 py-1'>
                      TypeScript
                    </Badge>
                    <Badge variant='secondary' className='px-3 py-1'>
                      Vite
                    </Badge>
                    <Badge variant='secondary' className='px-3 py-1'>
                      Tailwind CSS
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className='border border-border/50'>
                <CardContent className='p-6'>
                  <h3 className='text-lg font-semibold mb-2'>{t('blog.sidebar.newsletter')}</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {t('blog.sidebar.newsletter.description')}
                  </p>
                  <Button className='w-full'>{t('blog.sidebar.newsletter.button')}</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
