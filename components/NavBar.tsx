import Link from 'next/link';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { NavData } from '../types/data';
import { convertTitleToSlug } from '../utils';

// sets "active" nav link styles based on current URL slug
const getActiveLinkClasses = (
  thisLink: string,
  currentSelectedLink: string | string[] | undefined,
) => {
  return thisLink === currentSelectedLink
    ? 'text-neutral-300'
    : 'text-neutral-400 hover:text-neutral-300';
};

const toggleDropdown = (setState: Dispatch<SetStateAction<boolean>>) => {
  setState((prevState) => !prevState);
};

export const NavBar = ({
  navData,
  currentGallery,
}: {
  navData?: NavData[];
  currentGallery?: string | string[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuContainer = useRef<HTMLDivElement | null>(null);

  const dropdownContainerClasses = dropdownOpen
    ? 'block absolute z-10 bg-neutral-900 min-w-max	px-4 pb-3'
    : 'hidden';
  const dropdownItemClasses = 'block m-3';
  const svgRotateClasses = dropdownOpen
    ? 'rotate-90 transition'
    : 'rotate-0 transition';

  useEffect(() => {
    // Handling so a click outside of the menu closes it
    const listenForOutsideClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !menuContainer.current?.contains(e.target)
      ) {
        return toggleDropdown(setDropdownOpen);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('click', listenForOutsideClick);
    }
    return () => {
      document.removeEventListener('click', listenForOutsideClick);
    };
  }, [menuContainer, dropdownOpen, setDropdownOpen]);

  return (
    <nav className="flex justify-end flex-wrap gap-x-3 mr-4 md:mr-8">
      <div className="relative" ref={menuContainer}>
        <button
          onClick={() => toggleDropdown(setDropdownOpen)}
          className={`flex gap-2 items-center ${getActiveLinkClasses(
            '/galleries',
            currentGallery,
          )}`}
        >
          Galleries
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            className={`h-4 w-4 ${svgRotateClasses}`}
          >
            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </button>
        <div className={dropdownContainerClasses}>
          <Link
            href="/"
            className={`${dropdownItemClasses} ${getActiveLinkClasses(
              '/',
              currentGallery,
            )}`}
            onClick={() => toggleDropdown(setDropdownOpen)}
          >
            All Galleries
          </Link>
          {navData?.map((navItem) => {
            const slug = convertTitleToSlug(navItem.title);
            return (
              <Link
                key={navItem.contentfulId}
                href={`/galleries/${slug}`}
                className={`${dropdownItemClasses} ${getActiveLinkClasses(
                  slug,
                  currentGallery,
                )}`}
                onClick={() => toggleDropdown(setDropdownOpen)}
              >
                {navItem.title}
              </Link>
            );
          })}
        </div>
      </div>
      <p className="text-neutral-400">|</p>
      <Link
        href="/contact"
        className={getActiveLinkClasses('/contact', currentGallery)}
      >
        Contact
      </Link>
    </nav>
  );
};
