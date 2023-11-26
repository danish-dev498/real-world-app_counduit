'use client';
import { Button } from '@/components/ui/button';
import { BsFillMoonStarsFill, BsSun, BsDisplayFill } from 'react-icons/bs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';

const ThemePopover = () => {
  const [mounted, setIsMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: 'Light', icon: BsSun, value: 'light' },
    { name: 'Dark', icon: BsFillMoonStarsFill, value: 'dark' },
    { name: 'System', icon: BsDisplayFill, value: systemTheme },
  ];

  const currentThemeIcon =
    theme === 'light' ? (
      <BsSun color='#1ea6b0' size={18} />
    ) : (
      <BsFillMoonStarsFill color='#1ea6b0' size={18} />
    );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='border-none'>
          {currentThemeIcon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 pr-0 w-70'>
        <PopoverClose>
          <ul className='py-2 w-36'>
            {themes.map(({ name, icon: Icon, value }) => (
              <li
                key={name}
                className='flex items-center gap-3 py-1 pl-4 hover:bg-custom-gray-100 dark:hover:bg-gray-700'
                onClick={() => setTheme(value)}
              >
                <Icon
                  color={
                    theme === name.toLocaleLowerCase() ? '#2ecfdb' : '#94a3b8'
                  }
                  size={18}
                />

                <a
                  href='#'
                  className={`font-semibold ${
                    theme === name.toLocaleLowerCase()
                      ? 'text-steel-blue-500'
                      : ''
                  }`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default ThemePopover;
