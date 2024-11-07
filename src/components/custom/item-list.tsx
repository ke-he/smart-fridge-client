'use client';

import { Fragment } from 'react';
import { Input, ScrollArea, Separator } from '@components';
import { ItemTypeSelect } from '@/components/custom/item-type-select';
import { useWritableSearchParams } from '@/lib/common/hooks/useWritableSearchParams';
import DisplayCount from '@/components/custom/display-count';
import DisplayDate from '@/components/custom/display-date';
import { ItemsDtoFilter } from '@service/item';
import { useItemContext } from '@/contexts/item.provider';

export function ItemList() {
  const { searchParams, setParam } = useWritableSearchParams<ItemsDtoFilter>();
  const { items, types } = useItemContext();

  const name = searchParams.get('name') || '';
  const type = searchParams.get('type') || '';

  const handleTypeChange = (value: string) => {
    setParam('type', value);
  };

  const handleNameChange = (value: string) => {
    setParam('name', value);
  };

  // const handleIncreaseItem = async (id: number) => {
  //   // await increaseItem(id);
  // };

  return (
    <>
      <div className="flex w-screen gap-2 p-5">
        <Input
          name="name-search"
          placeholder="Search item..."
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <ItemTypeSelect
          types={types}
          nullable={true}
          className="w-[180px]"
          name="type-search"
          value={type}
          onValueChange={handleTypeChange}
        />
      </div>
      <div className="flex w-screen justify-center p-5">
        <ScrollArea className="h-72 w-screen rounded-md border">
          <div className="p-4">
            {items.map((item) => (
              <Fragment key={item.id}>
                <div
                  className="flex justify-between"
                  // onClick={() => handleIncreaseItem(item.id)}
                >
                  <div key={item.id} className="text-sm w-100 text-left">
                    {item.name}
                  </div>
                  <div
                    key={item.id + '-count'}
                    className="text-xs w-100 text-center"
                  >
                    <DisplayCount count={item.count} />
                  </div>
                  <div
                    key={item.id + '-expiration'}
                    className="text-xs w-100 text-right"
                  >
                    <DisplayDate date={new Date(item.expiration_date)} />
                  </div>
                </div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
