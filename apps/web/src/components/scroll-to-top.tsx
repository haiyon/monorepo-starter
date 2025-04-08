import { useState, useEffect } from 'react';

import { ChevronUp } from 'lucide-react';

import { Button } from './ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    const scrollable = document.querySelector('.overflow-y-auto');
    if (scrollable && scrollable.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    const scrollable = document.querySelector('.overflow-y-auto');
    if (scrollable) {
      scrollable.addEventListener('scroll', toggleVisibility);
    }
    return () => {
      if (scrollable) {
        scrollable.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    const scrollable = document.querySelector('.overflow-y-auto');
    if (scrollable) {
      scrollable.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className='fixed bottom-10 right-10 z-50 rounded-full shadow-lg hover:shadow-xl h-6 w-6 bg-primary text-primary-foreground'
          size='icon'
        >
          <ChevronUp size={24} />
        </Button>
      )}
    </>
  );
}
