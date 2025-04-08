import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import HomePage from '@/pages/home';

const AutoPage = () => {
  const navigate = useNavigate();

  const viewPublic = new URLSearchParams(window.location.search).get('view') === 'public';
  // TODO: add authentication
  const isAuthenticated = false;

  useEffect(() => {
    if (isAuthenticated && !viewPublic) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, viewPublic]);

  return <HomePage />;
};

export default AutoPage;
