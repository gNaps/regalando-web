"use client";

import { nephilm } from "@/app/styles/fonts";
import { useCategories } from "@/hooks/useCategories";
import { GiftModel } from "@/models/gift.model";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "../inputs/input-text.component";
import { Listbox } from "@headlessui/react";
import Button from "../button.component";
import InputTextArea from "../inputs/input-textarea.component";

const GiftForm = ({
  id,
  name,
  description,
  price,
  retail_store,
  online_store,
  category,
}: Partial<GiftModel>) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    ...(id
      ? {
          defaultValues: {
            name,
            description,
            price,
            retail_store,
            online_store,
          } as any,
        }
      : {}),
  });
  const categories = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(
    id ? categories.find((c) => c.id === category)! : categories[0]
  );

  const onSubmit = async (data: any) => {
    if (!!id) {
      const { data: updatedGift } = await supabase
        .from("gifts")
        .update({
          name: data.name,
          description: data.description,
          price: data.price,
          retail_store: data.retail_store,
          online_store: data.online_store,
          category: selectedCategory.id,
        })
        .eq("id", id)
        .select()
        .single();

      router.push(`/home/user/gift/${updatedGift.id}`);
    } else {
      const { data: insertedGift } = await supabase
        .from("gifts")
        .insert({
          name: data.name,
          description: data.description,
          price: data.price,
          retail_store: data.retail_store,
          online_store: data.online_store,
          category: selectedCategory.id,
        })
        .select()
        .single();

      router.push(`/home/user/gift/${insertedGift.id}`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <ChevronLeftIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => router.push("/home/user")}
        />
        <h1 className={`text-3xl ${nephilm.className}`}>
          {id ? "Update gift" : "Create gift"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col w-full flex-1"
      >
        <p className="mb-2">Name *</p>
        <InputText
          type="text"
          name="name"
          placeholder="Enter name..."
          validationSchema={{
            required: "Name is required",
          }}
          register={register}
          errors={errors}
        />
        <p className="my-2">Description *</p>
        <InputTextArea
          name="description"
          placeholder="Enter description..."
          validationSchema={{
            required: "Description is required",
          }}
          register={register}
          errors={errors}
        />
        <p className="my-2">Price *</p>
        <InputText
          type="number"
          name="price"
          placeholder="Enter price..."
          validationSchema={{
            required: "Price is required",
          }}
          register={register}
          errors={errors}
          step={0.1}
        />
        <p className="my-2">Retail store</p>
        <InputText
          type="text"
          name="retail_store"
          placeholder="Enter store..."
          validationSchema={{}}
          register={register}
          errors={errors}
        />
        <p className="my-2">Online store</p>
        <InputText
          type="text"
          name="online_store"
          placeholder="Enter URL online store..."
          validationSchema={{}}
          register={register}
          errors={errors}
        />
        <p className="my-2">Category</p>
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <Listbox.Button>
            <div className="p-3 mb-5 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray flex items-center">
              {selectedCategory.icon} {selectedCategory.name}
              <ChevronDownIcon className="h-5 w-5 ms-auto text-gray" />
            </div>
          </Listbox.Button>
          <Listbox.Options className="mt-1 mb-5 w-full rounded-lg border-2 border-gray shadow-lg">
            {categories.map((c, cIdx) => (
              <Listbox.Option
                key={cIdx}
                className={`cursor-pointer select-none py-2 px-3 ${
                  selectedCategory.id === c.id
                    ? "bg-primary text-black"
                    : "text-white"
                }`}
                value={c}
              >
                <span className="flex">
                  {c.icon} {c.name}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <span className="mt-auto">
          <Button type="submit" value="Save" theme="primary"></Button>
        </span>
      </form>
    </>
  );
};

export default GiftForm;
