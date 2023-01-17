import AreaInput from './AreaInput';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Form';
import Image from 'next/image';
import Input from './Input';
import PhotoInput from './PhotoInput';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

export default function AdminItemCard({
  wishlistItem: {
    _id: itemId, name, imgUrl, imgAlt, description, buyLink,
  },
}) {

  const router = useRouter();

  const handleDeleteRequest = async (e) => {
    e.preventDefault()

    const { target: { elements: { id } } } = e;

    const query = { id }

    try {
      const res = await fetch(`/api/wishitems/${itemId}`, {
        method: 'DELETE',
        query,
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate("/api/wishitems/", data, false); // Update the local data without a revalidation
      // router.reload();
      router.push("/admin/dashboard")
    } catch (error) {
      console.log(error);
    }
  }

  const renderItemModal = (type, title, button1Text, button2Text, handler = undefined) => {
    return (
      <div className="modal fade" id={`${type}Modal${itemId}`} tabIndex="-1" aria-labelledby={`#${type}Modal${itemId}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <Form onSubmit={handler} renderSubmitButton={false} id={`${type}Form`} action={handler ? undefined : "/api/wishitems"}>
              <div className="modal-body">
                {type === 'edit' && (
                  <>
                    <Input name="name" title="Item Name" placeholder="My new Item!" type="text" defaultValue={name} />
                    <Input name="buyLink" title="Link to Buy" placeholder="https://amazon.com/" type="text" defaultValue={buyLink} />
                    <AreaInput name="description" title="Additional Details" rows="2" placeholder="What would this item mean to you?" defaultValue={description} />
                    <PhotoInput title="Upload a picture" prompt="Image should ideally be square, with the gift item in focus." name="itemImg" />
                    <Input name="id" type="hidden" defaultValue={itemId} />
                  </>
                )}
                {type === 'delete' && (
                  <>
                    <p>Are you sure you want to delete this item?</p>
                    <Input name="itemId" type="hidden" defaultValue={itemId} />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className={`btn ${type === "edit" ? "btn-success" : "btn-danger"}`} type="submit">{button1Text}</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{button2Text}</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card lg:h-56 w-80 rounded-lg">
      <div className="card-body relative container">
        <div className="grid grid-cols-3 justify-between">
          <Image src={imgUrl} alt={"image of gift"} height="75" width="75" className="rounded col-span-1" />
          <div className="flex flex-col justify-center col-span-2">
            <h1 className="text-center text-xl font-bold">{name}</h1>
          </div>
        </div>
        <div>
          <p className="pt-2">{description}</p>
          <a href={buyLink} className="pt-1 pb-4 lg:pb-0 text-purple-600">View Item &gt;</a>
        </div>
        <div className="absolute top-2 right-0">
          <Button color="success" aria-label="edit" variant="text" data-bs-toggle="modal" data-bs-target={`#editModal${itemId}`}>
            <EditIcon />
          </Button>
        </div>
        <div className="absolute bottom-2 right-0">
          <Button color="error" aria-label="edit" variant="text" data-bs-toggle="modal" data-bs-target={`#deleteModal${itemId}`}>
            <DeleteIcon />
          </Button>
        </div>
        <div>
          {renderItemModal("edit", `Edit ${name}`, "Done", "Close")}
          {renderItemModal("delete", `Delete ${name}`, "Delete", "Cancel", handleDeleteRequest)}
        </div>
        <br />
      </div>
    </div>
  );
}
