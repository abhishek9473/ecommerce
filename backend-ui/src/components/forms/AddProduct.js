import React, { useState } from "react";
import Dropdown from "../element/Dropdown";
import { useForm } from "react-hook-form";
import { addNewProductInDb } from "@/services/api-services";

function AddProduct({ onClose, refresh, categoryOption, selectedCategory }) {
  const [imgData, setImgData] = useState("");
  const imgDataHandler = (event) => setImgData(event.target.value);

  const oldData = {
    categoryId: selectedCategory,
  };
  const { register, handleSubmit } = useForm({ defaultValues: oldData });

  // api calling for add data in product section
  const onSubmit = (data) => {
    addNewProductInDb(data)
      .then((responce) => {
        if (responce.status == true) {
          refresh ? refresh() : null;
          onClose();
        } else if (responce.status == false) {
          console.log("add product responce (false): ", responce);
        }
      })
      .catch((error) => console.log("add product form page error", error));
  };

  return (
    <>
      <div className="min-h-[25rem] w-[35rem]">
        <div>
          <div className="bg-blue-dark text-center font font-bold text-xl py-1">
            Add Product
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-blue-light flex flex-col gap-2 px-4 py-2 ">
              <div className="flex justify-between">
                <div>Select product category : </div>
                <Dropdown register={register} data={categoryOption} />
              </div>

              <div className="flex justify-between">
                <label htmlFor="brandname">Brand name :</label>
                <input
                  id={"brandname"}
                  required
                  type="text"
                  className="modalInput"
                  placeholder="Brand Name"
                  {...register("brandName")}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="modalName"> model name : </label>
                <input
                  required
                  id={"modalName"}
                  type="text"
                  className="modalInput"
                  placeholder="modal name"
                  {...register("modelName")}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="varient">Varient : </label>
                <input
                  required
                  id={"varient"}
                  type="text"
                  className="modalInput"
                  placeholder="Varient"
                  {...register("varient")}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="specification">Specification : </label>
                <input
                  required
                  id={"specification"}
                  type="text"
                  className="modalInput"
                  placeholder="Specification"
                  {...register("specification")}
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <label htmlFor="mrp">Mrp : </label>
                  <input
                    required
                    id={"mrp"}
                    type="text"
                    className="modalInput"
                    placeholder="Mrp"
                    {...register("mrp")}
                  />
                </div>
                <div>
                  <label htmlFor="sellingPrice">Selling price : </label>
                  <input
                    required
                    id={"sellingPrice"}
                    type="text"
                    className="modalInput"
                    placeholder="Selling price"
                    {...register("sellingPrice")}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="qty">quantity : </label>
                <input
                  required
                  id={"qty"}
                  type="number"
                  className="modalInput"
                  placeholder="Qty"
                  {...register("quantity")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-4">
                  <label htmlFor="imageSrc">Image src : </label>
                  <input
                    required
                    id={"imageSrc"}
                    type="text"
                    className="modalInput flex-grow"
                    placeholder="Image Src"
                    {...register("imageSrc")}
                    onChange={imgDataHandler}
                  />
                </div>
                {/* div for display image // url */}
                <div className=" h-28 flex justify-between">
                  {imgData.length >= 1 ? (
                    <img
                      className="w-44"
                      src={imgData}
                      alt="url error"
                      height={50}
                      width={50}
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="button red-effect"
                  type="button"
                >
                  cancel
                </button>
                <button className="button blue-effect">add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
