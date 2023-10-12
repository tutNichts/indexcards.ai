import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { array, object, string } from "yup";
import { storedSets } from "./Store";
import { Form, Formik, Field } from "formik";

export default function CreateSetModal({ isOpen, onClose, addSet }) {
  const titleInputRef = useRef();
  const tagsInputRef = useRef();

  const validationSchema = object({
    title: string().required("Bitte gib einen Titel für das Set an!"),
    tags: array().of(string()).min(3, "Please enter at least 3 keywords!"),
  });

  const [pdf, setPdf] = useState(null);
  const [fileNames, setFileNames] = useState(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={titleInputRef}
        onClose={onClose}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Overlay
              className="fixed inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            />
          </Transition.Child>
          <Formik
            initialValues={{ title: "", tags: [] }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              addSet(validationSchema.cast(values)).then(() => {
                onClose();
              });
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({
              errors,
              values: { tags, title },
              setFieldValue,
              setValues,
            }) => {
              const setProposals =
                title.length < 3
                  ? []
                  : storedSets.filter(
                      ({ topic }) =>
                        topic.toLowerCase().includes(title.toLowerCase()) &&
                        topic.length !== title.length
                    );

              return (
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Form className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-600 pt-6 px-6 pb-2"
                    >
                      Create Index Card Set
                    </Dialog.Title>
                    <div className="px-6 py-5 flex flex-col">
                      <div className="mb-4">
                        <label className="block">
                          <div className="mb-1 font-medium text-base text-gray-500">
                            Title
                          </div>
                          <Field
                            ref={titleInputRef}
                            className="rounded focus:outline-0 text-gray-700 border border-gray-200 p-2 w-full"
                            type="text"
                            placeholder="Networking"
                            name="title"
                          />
                          {errors.title && (
                            <p className="mt-1 text-xs text-red-500 font-medium">
                              {errors.title}
                            </p>
                          )}
                        </label>

                        {setProposals.length > 0 && (
                          <div className="flex flex-wrap mt-2 border-2 border-dashed border-gray-200 rounded p-2">
                            {setProposals.map(
                              ({ topic, tags: proposalTags }) => (
                                <button
                                  key={topic}
                                  className="bg-gray-300 text-gray-600 text-xs font-medium rounded-full px-2 py-1 m-1"
                                  onClick={() => {
                                    setValues((values) => ({
                                      tags: [
                                        ...new Set([
                                          ...proposalTags,
                                          ...values.tags,
                                        ]),
                                      ],
                                      title: topic,
                                    }));
                                    tagsInputRef.current.focus();
                                  }}
                                >
                                  {topic}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block">
                          <div className="mb-1 font-medium text-base text-gray-500">
                            Tags
                          </div>
                          <input
                            ref={tagsInputRef}
                            className="rounded focus:outline-0 text-gray-700 border border-gray-200 p-2 w-full"
                            type="text"
                            placeholder="Press Enter"
                            onKeyDown={(event) => {
                              if (event.target.value.length < 3) {
                                return;
                              }

                              if (event.key === "Enter") {
                                event.preventDefault();

                                const inputValue = event.target.value;
                                setValues((values) => ({
                                  ...values,
                                  tags: [
                                    ...new Set([...values.tags, inputValue]),
                                  ],
                                }));
                                event.target.value = "";
                              }
                            }}
                          />
                        </label>
                        {errors.tags && (
                          <p className="mt-1 text-xs text-red-500 font-medium">
                            {errors.tags}
                          </p>
                        )}

                        {tags.length > 0 && (
                          <div className="flex flex-wrap mt-2 border-2 border-dashed border-gray-200 rounded p-2">
                            {tags.map((tag) => (
                              <button
                                key={tag}
                                className="bg-gray-300 text-gray-600 text-xs font-medium rounded-full px-2 py-1 m-1"
                                onClick={() => {
                                  setFieldValue(
                                    "tags",
                                    tags.filter((t) => t !== tag)
                                  );
                                }}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            document.querySelector(".input-field").click();
                          }}
                          className="font-medium text-white bg-indigo-500 shadow text-sm rounded-lg py-2 px-3"
                        >
                          Upload Lecture Notes
                        </button>
                        <input
                          type="file"
                          accept=".pdf"
                          className="input-field"
                          hidden
                          onChange={({ target: { files } }) => {
                            const file = files[0];
                            setPdf(URL.createObjectURL(file));

                            console.log(
                              Array.from(files).map(({ name }) => name)
                            );

                            setFileNames(
                              Array.from(files).map(({ name }) => name)
                            );
                          }}
                        />
                      </div>
                      {fileNames &&
                        fileNames.map((fileName) => {
                          return (
                            <p className="text-xs text-gray-600 pt-2">
                              {fileName}
                            </p>
                          );
                        })}
                    </div>
                    <div className="px-6 py-3 bg-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                        }}
                        className="font-medium text-base text-gray-400"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="font-medium text-white bg-indigo-500 shadow text-sm rounded-lg py-2 px-3"
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                </Transition.Child>
              );
            }}
          </Formik>
        </div>
      </Dialog>
      {/* {uploadFile && (
        <input
          type="file"
          name="file"
          onChange={(file) => {
            console.log(file);
          }}
        />
      )} */}
    </Transition>
  );
}
