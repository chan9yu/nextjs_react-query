import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'nextjs react query',
	description: 'Next.js app router with react-query',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon/favicon.ico'
		}
	]
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko">
			<body className={openSans.className}>{children}</body>
		</html>
	);
}
