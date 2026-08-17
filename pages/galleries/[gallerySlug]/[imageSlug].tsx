import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useImageQuery } from '../../../data/queries';
import ReactTouchEvents from 'react-touch-events';
import { KeyboardEventHandler, SyntheticEvent, useEffect, useRef } from 'react';

export default function ImageWrapper() {
  const router = useRouter();
  const { gallerySlug, imageSlug } = router.query;

  const { isPending, isError, data } = useImageQuery(imageSlug, gallerySlug);

  const handleSwipe = (
    event: SyntheticEvent,
    direction: 'left' | 'right' | 'top' | 'bottom',
  ) => {
    switch (direction) {
      case 'left':
        return router.push(`/galleries/${gallerySlug}/${data?.nextImageSlug}`);
      case 'right':
        return router.push(
          `/galleries/${gallerySlug}/${data?.previousImageSlug}`,
        );
      default:
        return;
    }
  };

  const handleArrowEvent: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    switch (e.code) {
      case 'ArrowUp':
        return router.push(`/galleries/${gallerySlug}`);
      case 'ArrowLeft':
        return router.push(
          `/galleries/${gallerySlug}/${data?.previousImageSlug}`,
        );
      case 'ArrowRight':
        return router.push(`/galleries/${gallerySlug}/${data?.nextImageSlug}`);
      default:
        return;
    }
  };

  let sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isPending) {
      sectionRef.current?.focus();
    }
  }, [isPending]);

  return (
    <section
      className="text-center focus:outline-none"
      tabIndex={-1}
      onKeyDown={(e) => handleArrowEvent(e)}
      ref={sectionRef}
    >
      <div>
        <Link
          href={`/galleries/${gallerySlug}/${data?.previousImageSlug}`}
          className="inline-block m-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-400 hover:text-neutral-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </Link>

        <Link href={`/galleries/${gallerySlug}`} className="inline-block m-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-400 hover:text-neutral-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7l4-4m0 0l4 4m-4-4v18"
            />
          </svg>
        </Link>

        <Link
          href={`/galleries/${gallerySlug}/${data?.nextImageSlug}`}
          className="inline-block m-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-400 hover:text-neutral-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {isError ? (
        <Error message="The image could not be found. Please try again." />
      ) : isPending ? (
        <Loading />
      ) : (
        <ReactTouchEvents onSwipe={handleSwipe}>
          <div className="max-w-screen-lg mx-auto">
            <Image
              alt={
                data.asset.fields.description ||
                data.description ||
                data.asset.fields.title ||
                'Photograph by Christopher Allen'
              }
              src={`https:${data.asset.fields.file.url}`}
              width={data.asset.fields.file.details.image?.width}
              height={data.asset.fields.file.details.image?.height}
              priority={true}
              className="inline-block max-w-full h-auto border-neutral-400 border-[1px] border-solid"
            />
            {data.description && (
              <p className="text-neutral-400 text-[.8125rem] mt-4 tracking-wide">
                {data.description}
              </p>
            )}
          </div>
        </ReactTouchEvents>
      )}
    </section>
  );
}
