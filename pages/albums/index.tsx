import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';
import Image from 'next/image';
import { convertTitleToSlug } from '../../utils';
import { useSiteNavQuery } from '../../data/queries';

export default function AlbumNav() {
  const { isLoading, isError, data } = useSiteNavQuery();
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );

  return (
    <section className="grid grid-cols-album gap-5">
      {data.map((albumData) => (
        <Link
          href={`/albums/${convertTitleToSlug(albumData.title)}`}
          key={albumData.contentfulId}
        >
          <a className="block relative text-transparent hover:text-zinc-200 hover:transition">
            <Image
              alt={albumData.firstEntry.description}
              src={`https:${albumData.firstEntry.url}`}
              height={albumData.firstEntry.height}
              width={albumData.firstEntry.width}
              className="hover:opacity-50 hover:transition"
            />
            <h2 className="text-lg absolute top-1/3 left-5">
              {albumData.title}
            </h2>
          </a>
        </Link>
      ))}
    </section>
  );
}
