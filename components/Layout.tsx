import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { getClientData, getNav } from '../api/contentful';
import Loading from './Loading';
import Error from './Error';
import { NavBar } from './NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isError, data } = useQuery(['albums'], getClientData);
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );
  const navData = getNav(data);

  return (
    <>
      <Head>
        <title>Christopher Allen Photography</title>
        <meta
          name="description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
        />
        {/* what to use for the favicon? */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl border-b-2 mt-4">
        <Link href="/">
          <a className="ml-4 md:ml-8">
            Christopher Allen <span className="text-2xl">Photography</span>
          </a>
        </Link>
      </h1>
      <NavBar navData={navData} />

      <main className="m-8 max-w-screen-xl xl:mx-auto">{children}</main>

      <footer className="text-center text-sm border-t-2 p-4">
        <p>
          Christopher Allen Photography, Whitinsville, Massachusetts, email to
          &quot;contact&quot; @ this website.
        </p>
        <p>
          © {new Date().getFullYear()} Christopher Allen Photography. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}