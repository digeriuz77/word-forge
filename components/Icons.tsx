import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H261.6c-3.2-10.4-5.6-21.2-5.6-32c0-56.5 33.4-106.3 83.2-128.5c2.3-.9 4.7-1.9 7-2.8c12.5-5.3 26.2-8.2 40.8-8.2c16.3 0 32 3.6 46.4 10.1c1.5.7 3 1.4 4.5 2.2c-2.8-21-10.6-40.8-22.3-57.8C425.2 104.5 391.8 64 352 64H48zM144 144c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16z" fill="#f97316"/>
    <path d="M304 312c0 61.9 50.1 112 112 112s112-50.1 112-112s-50.1-112-112-112s-112 50.1-112 112zM512 312c0 4.2-.3 8.4-.8 12.5c-2.3-33.1-22.1-61.9-50.4-78.4c-4.1-2.4-8.4-4.5-12.9-6.3c-4.5-1.8-9.2-3.3-14-4.6c-13.6-3.7-28-5.6-42.8-5.6c-12.5 0-24.7 1.6-36.2 4.6c-4.5 1.2-8.9 2.6-13.2 4.2c-4.2 1.6-8.3 3.4-12.3 5.4c-28.8 14.5-50.3 41.9-54.4 74.4c-1.3 10-1.9 20.3-1.9 30.8c0 58.9 44.9 107.3 102.1 111.5c-8.9-4.2-17-9.8-24.1-16.9c-29.3-29.3-29.3-76.8 0-106.1s76.8-29.3 106.1 0c6.9 6.9 12.5 14.8 16.6 23.5c3.8-3.4 7.2-7.1 10.4-11.1c.3-.4.6-.7.9-1.1c1-1.3 1.9-2.6 2.8-3.9c13.2-18.7 20.3-41.1 20.3-64.5z" fill="#f97316"/>
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const BookIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const DailyRecallIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 15.75a.75.75 0 001.5 0v-2.086l.64.64a.75.75 0 101.06-1.06l-1.93-1.93a.75.75 0 00-1.06 0l-1.93 1.93a.75.75 0 101.06 1.06l.64-.64v2.086z" />
    </svg>
);

export const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);
