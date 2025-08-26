'use client';

import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {}, []);

  return (
    <footer className="text-center text-xs text-slate-400 py-6">
      © 2025
      <span className="font-semibold text-blue-600 dark:text-blue-400">
        Simple Chat App
      </span>
      . Made with <span className="text-red-500">♥</span>
    </footer>
  );
};

export default Footer;
