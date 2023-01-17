# Architecture of WishlistApp [WiP]

The wishlist app will have two user interfaces for two different classes of users (defined as UserRole):

- A UI where the "admin" can add and manage items, as well as general administrative stuff
- Another interface where users can login and reserve gifts to buy for the giftee / admin.

## Gift reservation

The reservation of the gifts is anonymous, meaning that the admin / giftee as well as the other users will not know who reserved the gifts (because I like surprises, could potentially change). The system will however keep track of who reserved what item, because in order to prevent multiple people from reserving the same item, the buttons should be disabled when a user other than the one who reserved the item loads the wishlist page.

## Admin backend

The admin backend should only be visible to users with the Admin User role. Currently there is a redirect in place when a normal user tries to access any of the admin pages, but this could be improved.

## Item reservation interface

Normal users and Admins should both be able to see the page where wishlist items can be reserved. Admins should not be able to reserve gift items, only normal users should be able to.

## Future plans [WIP]

This application can be made reusable through a containerised deployment with e.g. Docker / Kubernetes. Potential customers who would want to create their own personalised wishlist could do so. The container could be deployed and made to listen from a random port. Alternatively, we could have a different item reservation page and admin dashboard rendered per user, and map those to subdomains, thus eliminating the need for a containerised deployment. A wildcard SSL certificate would be needed to secure the (sub)domains, which would be randomly generated. 
