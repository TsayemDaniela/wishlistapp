import ItemButton, {IconType} from './ItemButton';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import ItemState from '../models/ItemState'

export default function Card({
  wishlistItem: {
    _id: itemId, name, imgUrl, imgAlt, description, buyLink, state: initialState, owner,
  },
  biRef,
  user
}) {
  const { _id: userId } = user;

  const [itemOwner, setItemOwner] = useState(owner);
  const [itemState, setItemState] = useState(initialState);

  useEffect(() => {
    biRef.updateItemCallback(itemId, itemState, itemOwner);
  }, [itemState, itemOwner, biRef, itemId])

  // function updateItemStateCallback(updateItemId, newItemState, newItemOwnerId) {
  //   console.log('Updating item state in other client')
  //   if (updateItemId === itemId) {
  //     setItemState(newItemState);
  //     setItemOwner(newItemOwnerId);
  //   }
  // }
  // biRef.updateChildItemStateCallback = updateItemStateCallback;

  function reserveItem() {
    setItemState(ItemState.RESERVED);
    setItemOwner(userId);
  }

  function boughtItem() {
    setItemState(ItemState.BOUGHT);
    setItemOwner(userId);
  }

  function availableItem() {
    setItemState(ItemState.AVAILABLE);
    setItemOwner("undefined");
  }

  return (
    <div className="card lg:h-56 w-80 rounded-lg">
      <div className="card-body relative container">
        <div className="grid grid-cols-3 justify-between">
          <Image src={imgUrl} alt="Gift Image" height="75" width="75" className="rounded col-span-1" />
          <div className="flex flex-col justify-center col-span-2">
            <h1 className="text-center text-xl font-bold">{name}</h1>
          </div>
        </div>
        <div>
          <p className="pt-2">{description}</p>
          <a href={buyLink} className="pt-1 pb-4 lg:pb-0 text-purple-600">View Item &gt;</a>
        </div>
        <div className="inline-flex flex-col items-center lg:absolute sm:flex-row container mx-auto lg:justify-end mt-3 lg:mt-6 bottom-0 lg:bottom-0.5 lg:right-0 lg:space-x-2.5 lg:space-y-0 space-y-1">
          {(owner === 'undefined' || owner === userId) && itemState === ItemState.AVAILABLE && (<ItemButton id="reserve" buttonText="Reserve" icon={IconType.favoriteOutline} color="#4E962C" onClick={reserveItem} />)}
          {(owner === 'undefined' || owner === userId) && itemState === ItemState.RESERVED && (
            <>
              <ItemButton id="bought?" buttonText="Bought?" color="#4361ee" icon={IconType.shoppingBag} onClick={boughtItem} />
              <ItemButton id="unreserve" buttonText="Unreserve?" icon={IconType.cancel} color="#ff1694" onClick={availableItem} filled />
            </>
          )}
          {(owner === 'undefined' || owner === userId) && itemState === ItemState.BOUGHT && (
            <>
              <ItemButton id="bought" buttonText="Bought!"  icon={IconType.shoppingBag} filled disabled />
              <ItemButton id="cancel" buttonText="Cancel?" icon={IconType.cancel} color="#ff0000" onClick={reserveItem} />
            </>
          )}
          {(!(owner === 'undefined') && (owner !== userId)) && <ItemButton id="reserved" buttonText="Reserved" disabled />}
        </div>
        <br />
      </div>
    </div>
  );
}
