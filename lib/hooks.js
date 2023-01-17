import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = ([url, role]) => (
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: role }),
  })
)
  .then(data => data.json())

export function useUser({ redirectTo, redirectIfFound, redirectIfNotFound, fallbackRedirect, role } = {}) {
  const { data, error } = useSWR(['/api/user', role], fetcher);
  let userData = data?.user;
  // empty array is truthy, so we make it undefined to set hasUser to false.
  let user;
  if (Array.isArray(userData)) {
    if (!userData.length) {
      user = undefined;
    } else {
      [user] = userData
    }
  }
  const finished = Boolean(data);
  let hasUser;
  if (user === undefined || user === null) {
    hasUser = false;
  } else {
    hasUser = true;
  }

  useEffect(() => {
    if (!redirectTo || !finished) return;
    // if redirectIfNotFound and redirectTo are set, redirect
    if (fallbackRedirect && redirectIfNotFound && !hasUser) {
      Router.push(fallbackRedirect);
    }
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && hasUser)
      // If redirectIfFound is also set, redirect if the user was found
      || (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser, fallbackRedirect, redirectIfNotFound]);

  return error ? null : user;
}
