import AreaInput from "../../AreaInput"
import Form from "../../Form"
import Input from "../../Input"
import PhotoInput from "../../PhotoInput"

export default function AddItemModal() {
    return (
        <div className="modal fade" id={"addItemModal"} tabIndex="-1" aria-labelledby={"#addItemModal"} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{"Add Item"}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <Form renderSubmitButton={false} id={"addItemForm"} action={"/api/wishitems"}>
                        <div className="modal-body">
                            <Input name="name" title="Item Name" placeholder="My new Item!" type="text" />
                            <Input name="buyLink" title="Link to Buy" placeholder="https://amazon.com/" type="text" />
                            <AreaInput name="description" title="Additional Details" rows="2" placeholder="What would this item mean to you?" />
                            <PhotoInput title="Upload a picture" prompt="Image should ideally be square, with the gift item in focus." name="itemImg" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" type="submit">{"Add"}</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{"Cancel"}</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
