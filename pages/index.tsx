import type { NextPage } from 'next';
import Image from 'next/image';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Link from 'next/link';
import { useSiteNavQuery } from '../data/queries';
import { convertTitleToSlug } from '../utils';

const Home: NextPage = () => {
  const { isPending, isError, data } = useSiteNavQuery();
  if (isPending) return <Loading />;
  if (isError)
    return (
      <Error message="Sorry, we couldn't display the images. Please try refreshing the page." />
    );

  return (
    <section className="grid grid-cols-gallery gap-5 max-w-screen-xl xl:w-full xl:mx-auto">
      {data.map((galleryData) => (
        <div
          className="relative text-neutral-200 focus-within:text-neutral-100 focus-within:transition"
          key={galleryData.contentfulId}
        >
          <Link
            href={`/galleries/${convertTitleToSlug(galleryData.title)}`}
            className="block relative focus:transition hover:transition focus:opacity-75 hover:opacity-75"
          >
            <Image
              alt={
                galleryData.firstEntry.description ||
                galleryData.firstEntry.title ||
                'Photograph by Christopher Allen'
              }
              src={`https:${galleryData.firstEntry.url}`}
              height={galleryData.firstEntry.height}
              width={galleryData.firstEntry.width}
              className="focus:transition hover:transition focus:opacity-75 hover:opacity-75"
            />
          </Link>
          <h2 className="text-lg px-2 absolute top-1/3 left-5 bg-neutral-900 opacity-80 pointer-events-none">
            {galleryData.title}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default Home;
