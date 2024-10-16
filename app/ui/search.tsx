'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; //добавляем задержку на выполнение функции handleSearch

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); //позволяет прочитать текущие знаачения параметров URL
  const pathname = usePathname(); //берем текущий URL
  const { replace } = useRouter(); // импортируем функцию replace из хука useRouter

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term); //первый параметр - имя параметра поиска в URL, второй параметр - значение параметра поиска.
    } else {
      params.delete('query'); //удаляем параметр поиска
    }
    replace(`${pathname}?${params.toString()}`);//работает так же как и router.push() только заменяет полностью 
    console.log(term);                          //текущий pathname на новый маршрут передаваемый в качестве аргумента с типом string 
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {      //event listener(when we use input stroke our console.log will output the same stroke which we entered)
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
