import { useEffect, useState } from 'react'

import Card from '../components/Card';
import Event from '../models/Event';
/* eslint-disable react/no-array-index-key */
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Layout from '../components/Layout';
import WishItem from '../models/WishItem';
import dbConnect from '../utils/dbConnect';
import io from 'socket.io-client'
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';

export default function Home({ wishitems }) {
  const user = useUser();
  const router = useRouter();
  var biRef = {}
  var socket;

  // useEffect(() => {
  //   socketInitializer()
  // }, [])

  // const socketInitializer = async () => {
  //   await fetch('/api/socket');
  //   socket = io()

  //   socket.on(Event.Connect, () => {
  //     console.log('connected')
  //   })

  //   socket.on(Event.UpdateItem, (msg) => {
  //     console.log("Update callback called in child")
  //     biRef.updateChildItemStateCallback(msg.updateItemId, msg.updateItemState, msg.updateItemOwnerId)
  //   })
  // }

  const updateItemCallback = async (itemId, itemState, itemOwnerId) => {
    // let msg = {
    //   updateItemId: itemId,
    //   updateItemState: itemState,
    //   updateItemOwnerId: itemOwnerId
    // }
    // socket.emit(Event.UpdateItem, msg);  // TODO: fix the socket setup so we can have real-time updates of the frontend

    const formData = new FormData();
    formData.append('id', itemId);
    formData.append('state', itemState);
    formData.append('owner', itemOwnerId);

    try {
      const res = await fetch("/api/wishitems", {
        method: 'POST',
        body: formData,
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate("/api/wishitems/", data, false); // Update the local data without a revalidation
      router.push('/');
    } catch (error) {
    }
  }
  biRef.updateItemCallback = updateItemCallback;
  
  return (
    <Layout user={user}>
      <Intro />
      {user ? (
        <>
          <div className="mt-4 flex flex-row justify-center space-x-5">
            <FavoriteBorderIcon style={{ fontSize: '2.25rem', color: 'rgb(243,244,246)' }} />
            <Header title="Wishlist" />
          </div>
          <div className="sm:w-24 w-auto h-auto container mx-8 lg:mx-40 xl:mx-52 2xl:mx-80 mb-14 xl:mb-12 rounded-md p-3 flex flex-wrap gap-x-8 lg:gap-4 gap-y-8 justify-center">
            {wishitems.map((item, index) => (
              <Card key={index} id={index} wishlistItem={item} biRef={biRef} user={user} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-xl text-gray-200 text-center">Login to view the  wishlist items.</h1>
        </div>
      )}
    </Layout>
  );
}

/* Retrieves items data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await WishItem.find({});
  const wishitems = result.map((doc) => {
    const wishitem = doc.toObject();
    wishitem._id = wishitem._id.toString();
    return wishitem;
  });

  return { props: { wishitems } };
}
