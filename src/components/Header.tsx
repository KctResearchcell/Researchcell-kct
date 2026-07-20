import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, Search, X } from 'lucide-react';

interface HeaderProps {
  currentHash: string;
  onNavigate: (hash: string) => void;
  onSearchOpen?: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  hash: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'about',
    label: 'About',
    hash: '#/about',
  },
  {
    id: 'research',
    label: 'Research',
    hash: '#/research',
  },
  {
    id: 'pathways',
    label: 'Pathways',
    hash: '#/programs',
  },
  {
    id: 'projects',
    label: 'Projects',
    hash: '#/projects',
  },
  // {
  //   id: 'publications',
  //   label: 'Publications',
  //   hash: '#/publications',
  // },
  // {
  //   id: 'knowledge',
  //   label: 'Knowledge',
  //   hash: '#/knowledge-hub',
  // },
  {
    id: 'community',
    label: 'Community',
    hash: '#/events',
  },
  {
    id: 'connect',
    label: 'Connect',
    hash: '#/connect',
  },
];

export default function Header({
  currentHash,
  onNavigate,
  onSearchOpen,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchExpanded) {
      searchInputRef.current?.focus();
    }
  }, [searchExpanded]);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    updateScrollState();

    window.addEventListener('scroll', updateScrollState, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchExpanded(false);
  }, [currentHash]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const handleNavigate = (hash: string) => {
    onNavigate(hash);
    setMobileMenuOpen(false);
    setSearchExpanded(false);
    setSearchQuery('');
  };

  const handleSearchOpen = () => {
    setMobileMenuOpen(false);

    if (onSearchOpen) {
      onSearchOpen();
      return;
    }

    setSearchExpanded(true);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    if (onSearchOpen) {
      onSearchOpen();
    } else {
      onNavigate('#/projects');
    }

    setSearchExpanded(false);
  };

  const isActive = (item: NavigationItem) => {
    switch (item.id) {
      case 'about':
        return (
          currentHash.startsWith('#/about') ||
          currentHash === '#/ecosystem' ||
          currentHash === '#/people'
        );

      case 'research':
        return (
          currentHash === '#/research' ||
          currentHash.startsWith('#/research/') ||
          currentHash === '#/research-areas' ||
          currentHash === '#/labs' ||
          currentHash === '#/challenges' ||
          currentHash.startsWith('#/research-circle/')
        );

      case 'pathways':
        return currentHash.startsWith('#/programs');

      case 'projects':
        return currentHash === '#/projects';

      case 'publications':
        return currentHash === '#/publications';

      case 'knowledge':
        return (
          currentHash === '#/knowledge-hub' ||
          currentHash === '#/resources'
        );

      case 'community':
        return currentHash === '#/events';

      case 'connect':
        return (
          currentHash === '#/connect' ||
          currentHash === '#/careers'
        );

      default:
        return currentHash === item.hash;
    }
  };

  const isLandingTop =
    !isScrolled &&
    (currentHash === '#/' ||
      currentHash === '/' ||
      currentHash === '');

  const headerThemeClass = isLandingTop
    ? 'border-transparent bg-white/15 text-[#202124] shadow-none'
    : 'border-black/[0.04] bg-white/90 text-[#202124] shadow-[0_10px_40px_rgba(32,33,36,0.06)]';

  const logoTextClass = isLandingTop
    ? 'text-[#1C2E4A]'
    : 'text-[#202124]';

  const subtitleTextClass = isLandingTop
    ? 'text-[#5F6368]'
    : 'text-[#202124]/60';

  return (
    <header
      className={`
        sticky top-0 z-50 h-[80px] w-full border-b
        font-sans backdrop-blur-xl transition-[background-color,border-color,box-shadow]
        duration-300 ${headerThemeClass}
      `}
    >
      <div className="relative mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {!searchExpanded ? (
          <>
            <button
  type="button"
  onClick={() => handleNavigate('#/')}
  aria-label="Go to Ré homepage"
  className="
    group flex shrink-0 items-center gap-3
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#4285F4]
    focus-visible:ring-offset-4
  "
>
  {/* Ré Logo */}
  <img
    src="src/assets/images/logo.png"   // Update with your logo path
    alt="Ré Logo"
    className="
      h-12
      w-auto
      object-contain
      transition-transform
      duration-300
      group-hover:scale-105
    "
  />

  {/* Optional Brand Text */}
  {/* <div className="hidden sm:flex flex-col leading-none">
    <span
      className={`text-[9px] font-bold uppercase tracking-[0.22em] ${subtitleTextClass}`}
    >
      Centre for
    </span>

    <span
      className={`mt-1 text-[12px] font-extrabold tracking-[0.18em] uppercase ${logoTextClass}`}
    >
      Research & Exploration
    </span>
  </div> */}
</button>
            <nav
              aria-label="Primary navigation"
              className="
                hidden items-center gap-5
                min-[1320px]:flex min-[1450px]:gap-7
              "
            >
              {NAVIGATION_ITEMS.map((item) => {
                const active = isActive(item);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.hash)}
                    aria-current={active ? 'page' : undefined}
                    className={`
                      group relative flex h-[80px] items-center
                      whitespace-nowrap text-[13px] font-bold tracking-[0.025em]
                      transition-colors duration-200
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-[#4285F4] focus-visible:ring-offset-2
                      ${
                        active
                          ? 'text-[#1A73E8]'
                          : 'text-[#202124]/68 hover:text-[#1A73E8]'
                      }
                    `}
                  >
                    {item.label}

                    <span
                      className={`
                        absolute inset-x-0 bottom-0 h-[3px] origin-center
                        bg-[#4285F4] transition-transform duration-300
                        ${
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }
                      `}
                    />
                  </button>
                );
              })}
            </nav>
          </>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearchSubmit}
            className="
              mx-auto flex h-[50px] w-full max-w-[1200px]
              items-center rounded-full border border-black/10
              bg-white px-5 shadow-sm
            "
          >
            <Search className="h-5 w-5 shrink-0 text-black/38" />

            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search research areas, projects, publications..."
              className="
                min-w-0 flex-1 bg-transparent px-4 text-[15px]
                font-medium text-[#202124] outline-none
                placeholder:text-black/35
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="
                  rounded-full px-3 py-1.5 text-xs font-bold
                  text-[#1A73E8] transition-colors hover:bg-[#1A73E8]/8
                "
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSearchExpanded(false);
                setSearchQuery('');
              }}
              className="
                ml-2 border-l border-black/10 pl-4 text-sm
                font-bold text-black/50 transition-colors
                hover:text-[#202124]
              "
            >
              Cancel
            </button>
          </motion.form>
        )}

        {!searchExpanded && (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleSearchOpen}
              aria-label="Open search"
              className="
                flex h-10 items-center gap-2 rounded-full
                border border-black/10 bg-white/85 px-3.5
                text-[13px] font-bold text-[#202124]/65 shadow-sm
                transition-[border-color,color,background-color,transform]
                duration-200 hover:-translate-y-0.5
                hover:border-[#1A73E8]/35 hover:bg-white
                hover:text-[#1A73E8]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#4285F4] focus-visible:ring-offset-2
                sm:px-4
              "
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full text-[#202124] transition-colors
                hover:bg-black/[0.055]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#4285F4]
                min-[1320px]:hidden
              "
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-x-0 bottom-0 top-[80px]
                z-30 bg-black/20 backdrop-blur-[2px]
                min-[1320px]:hidden
              "
            />

            <motion.nav
              aria-label="Mobile navigation"
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed inset-x-0 top-[80px] z-40
                max-h-[calc(100svh-80px)] overflow-y-auto
                border-b border-black/10 bg-[#F8F8F6]
                px-5 pb-8 pt-5 shadow-2xl
                min-[1320px]:hidden sm:px-8
              "
            >
              <div className="mx-auto max-w-3xl">
                <p className="mb-4 px-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black/35">
                  Navigate
                </p>

                <div className="divide-y divide-black/[0.07]">
                  {NAVIGATION_ITEMS.map((item, index) => {
                    const active = isActive(item);

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(item.hash)}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.025,
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        aria-current={active ? 'page' : undefined}
                        className={`
                          group flex w-full items-center justify-between
                          px-2 py-4 text-left transition-colors
                          focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-inset focus-visible:ring-[#4285F4]
                          ${
                            active
                              ? 'text-[#1A73E8]'
                              : 'text-[#1C2E4A] hover:text-[#1A73E8]'
                          }
                        `}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={`
                              font-mono text-[9px] font-bold
                              ${
                                active
                                  ? 'text-[#1A73E8]'
                                  : 'text-black/28'
                              }
                            `}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span className="text-lg font-bold tracking-[-0.02em]">
                            {item.label}
                          </span>
                        </span>

                        <ArrowRight
                          className={`
                            h-4 w-4 transition-transform duration-200
                            group-hover:translate-x-1
                            ${
                              active
                                ? 'text-[#1A73E8]'
                                : 'text-black/28'
                            }
                          `}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}