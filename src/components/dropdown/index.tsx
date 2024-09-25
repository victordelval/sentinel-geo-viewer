import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Spinner from '@/components/spinner';

import './style.css';

type DropdownProps = {
  loading: boolean;
  options: {
    value: string;
    label: string;
    thumbnail: string;
  }[];
  selected: string[];
  onClick: (value: string) => void;
};

export default function Dropdown(props: Readonly<DropdownProps>) {
  return (
    <Menu as="div" className="dropdown">
      <div>
        <MenuButton
          disabled={props.loading}
          className={`dropdown-button ${
            props.loading ? 'bg-gray-600' : 'bg-gray-900'
          }`}
        >
          {props.loading && <Spinner />}
          <span className="ml-3">Available images</span>
          <ChevronDownIcon aria-hidden="true" className="dropdown-icon" />
        </MenuButton>
      </div>

      <MenuItems transition className="dropdown-items">
        <div className="py-1">
          {props.options.map((option, index) => (
            <MenuItem key={option.value}>
              <button
                onClick={() => props.onClick(option.value)}
                className={`dropdown-item ${
                  props.selected.includes(option.value) ? 'bg-gray-700' : ''
                } `}
              >
                <Image
                  alt={'thumbnail-' + index}
                  src={option.thumbnail}
                  width={40}
                  height={40}
                  className="dropdown-thumbnail-item"
                />
                {option.label}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
