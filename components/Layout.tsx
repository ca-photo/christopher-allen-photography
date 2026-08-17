import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { NavBar } from './NavBar';
import { useRouter } from 'next/router';
import { useSiteNavQuery } from '../data/queries';
import { usePageTitle } from '../data/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname, query } = useRouter();

  const { data } = useSiteNavQuery();

  const pageTitle = usePageTitle(
    pathname,
    query.imageSlug,
    query.gallerySlug,
    data,
  );

  // Only show full footer on select pages
  const showFullFooter = pathname === '/' || pathname === '/contact';

  return (
    /* These flex styles help position the footer at the bottom of the window. */
    <div className="font-sans bg-neutral-900 flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
          key="description"
        />
        <meta property="og:title" content={pageTitle} key="title" />
        <meta
          property="og:description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
          key="og-description"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:site_name"
          content="Christopher Allen Photography"
          key="og-site-name"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl border-b-2 my-4 border-neutral-600">
        <Link
          href="/"
          className="mb-4 ml-4 md:ml-8 text-neutral-400 hover:text-neutral-300 flex flex-wrap gap-x-3 items-end font-serif tracking-[.5px]"
        >
          Christopher Allen <span className="text-2xl">Photography</span>
        </Link>
      </h1>

      <NavBar navData={data} currentGallery={query.gallerySlug || pathname} />

      {/* This flex style ensures the main content pushes the footer to the bottom. */}
      <main className="m-8 mb-28 flex-auto">{children}</main>

      <footer className="text-center text-sm text-neutral-500 border-t-2 border-neutral-600 p-4 flex-shrink-0">
        <p>
          © {new Date().getFullYear()} Christopher Allen Photography. All rights
          reserved.
        </p>
        {showFullFooter && (
          <p>
            Website by{' '}
            <a
              href="https://amyfrieson.com"
              className="hover:text-neutral-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amy Frieson
            </a>
          </p>
        )}
      </footer>
    </div>
  );
}
