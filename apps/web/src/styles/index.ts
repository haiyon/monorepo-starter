import '@/styles/globals.css';

const naiveStyleOverride = () => {
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);
};

export const setupStyles = () => {
  naiveStyleOverride();
};
