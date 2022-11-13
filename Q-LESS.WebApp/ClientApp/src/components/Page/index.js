import React from 'react';

const Page = ({ children }) => {
  return (
    <div style={{ margin: 'auto', marginTop: 24, maxWidth: '700px' }}>
      {children}
    </div>
  );
};

export default Page;
