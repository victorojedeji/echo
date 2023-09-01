import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../lib/routes';

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(LOGIN);
  }, []);

  return (
    <div></div>
  );
}