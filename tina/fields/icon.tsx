'use client';
import React from 'react';
import { Button, wrapFieldsWithMeta, Field, TinaField } from 'tinacms';
import { BiChevronRight } from 'react-icons/bi';
import { GoCircleSlash } from 'react-icons/go';
import { Icon, IconOptions } from '../../components/icon';
import { Popover, PopoverButton, Transition, PopoverPanel } from '@headlessui/react';
import { ColorPickerInput } from './color';

const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(' ');
  } else {
    return name;
  }
};

export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React.useState('');
  const filteredBlocks = React.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : 'Select Icon';
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;

  return (
    <div className="z-[1000] relative">
      <input type="text" id={input.name} className="hidden" {...input} />
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton>
              <Button className={`text-sm h-11 px-4 ${InputIcon ? 'h-11' : 'h-10'}`} size="custom" rounded="full" variant={open ? 'secondary' : 'white'}>
                {InputIcon && <InputIcon className="fill-current mr-1 w-7 h-auto text-blue-500" />}
                {inputLabel}
                {!InputIcon && <BiChevronRight className="opacity-70 fill-current ml-1 w-5 h-auto" />}
              </Button>
            </PopoverButton>
            <div className="-bottom-2 left-0 absolute w-full min-w-[192px] max-w-2xl translate-y-full" style={{ zIndex: 1000 }}>
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform opacity-0 -translate-y-2"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-2"
              >
                <PopoverPanel className="z-50 relative bg-white shadow-lg border border-gray-150 rounded-lg overflow-hidden">
                  {({ close }) => (
                    <div className="flex flex-col w-full h-full max-h-[24rem]">
                      <div className="z-10 bg-gray-50 shadow-sm p-2 border-gray-100 border-b">
                        <input
                          type="text"
                          className="block bg-white shadow-inner px-2.5 py-1.5 border border-gray-100 rounded-sm w-full text-sm placeholder-gray-200"
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(event) => {
                            setFilter(event.target.value);
                          }}
                          placeholder="Filter..."
                        />
                      </div>
                      {filteredBlocks.length === 0 && <span className="relative bg-gray-50 px-2 py-3 text-gray-300 text-xs text-center italic">No matches found</span>}
                      {filteredBlocks.length > 0 && (
                        <div className="grid grid-cols-6 auto-rows-auto p-2 w-full overflow-y-auto">
                          <button
                            className="relative flex-1 hover:bg-gray-50 focus:bg-gray-50 px-3 py-2 rounded-lg outline-none hover:text-blue-500 focus:text-blue-500 text-xs text-center transition-all duration-150 ease-out"
                            key={'clear-input'}
                            onClick={() => {
                              input.onChange('');
                              setFilter('');
                              close();
                            }}
                          >
                            <GoCircleSlash className="w-6 h-auto text-gray-200" />
                          </button>
                          {filteredBlocks.map((name) => {
                            return (
                              <button
                                className="relative flex flex-1 justify-center items-center hover:bg-gray-50 focus:bg-gray-50 px-3 py-2 rounded-lg outline-none hover:text-blue-500 focus:text-blue-500 text-xs text-center transition-all duration-150 ease-out"
                                key={name}
                                onClick={() => {
                                  input.onChange(name);
                                  setFilter('');
                                  close();
                                }}
                              >
                                <Icon
                                  data={{
                                    name: name,
                                    size: 'custom',
                                    color: 'blue',
                                  }}
                                  className="w-7 h-auto"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PopoverPanel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
});

export const iconSchema: TinaField = {
  type: 'object',
  label: 'Icon',
  name: 'icon',
  fields: [
    {
      type: 'string',
      label: 'Icon',
      name: 'name',
      ui: {
        component: IconPickerInput as React.FC,
      },
    },
    {
      type: 'string',
      label: 'Color',
      name: 'color',
      ui: {
        component: ColorPickerInput as React.FC,
      },
    },
    {
      name: 'style',
      label: 'Style',
      type: 'string',
      options: [
        {
          label: 'Circle',
          value: 'circle',
        },
        {
          label: 'Float',
          value: 'float',
        },
      ],
    },
  ],
};
