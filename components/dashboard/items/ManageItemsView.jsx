import { Button, Fab } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import AddItemModal from "./AddItemModal";
import AdminItemCard from "../../AdminItemCard";
import { red } from '@mui/material/colors';

const color = red[500];

export default function ManageItemsView({ wishitems, admin }) {
    return (
        <>
            <div className="flex flex-row w-full mb-4 justify-between">
                <h1 className="text-4xl text-white font-bold">Manage Items</h1>
                <Button color="inherit" aria-label="add" variant="contained" data-bs-toggle="modal" data-bs-target={"#addItemModal"}>
                    <AddIcon />
                    Add item
                </Button>
            </div>
            <AddItemModal />
            {wishitems.length !== 0 && (
                <div className="sm:w-24 w-auto h-auto container mx-2 lg:mx-5 xl:mx-10 2xl:mx-80 mb-14 xl:mb-12 rounded-md p-3 flex flex-wrap gap-x-8 lg:gap-4 gap-y-8 justify-center">
                    {wishitems.map((item, index) => (
                        <AdminItemCard key={index} id={index} wishlistItem={item} />
                    ))}
                </div>
            )}
        </>
    )
}