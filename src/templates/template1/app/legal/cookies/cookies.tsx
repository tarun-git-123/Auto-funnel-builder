import React from 'react';
import LegalContent from '../LegalContent';

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="prose prose-invert prose-lg max-w-none">
        <LegalContent type="cookies" />
      </div>
    </div>
  );
}