import classNames from "classnames";
import CreateSetModal from "./CreateSetModal";
import { useEffect, useState } from "react";
import { getState, persistState } from "./Store";
import { Link } from "react-router-dom";

// Get all card sets of the current user
// currentUser.cardSets.all()

// Creates a card set in context of the current user
/*
currentUser.cardSets.create({
	title: "Strategisches Management",
	tags: ["disruptive Innoviation", "WACC", "BCG-Matrix"],
})
*/

// Remove card set of the current user
// currentUser.cardSets.delete({ id: "ee964b90-ba46-4d3d-ab70-bcac6a57487a" })

export function Title() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium text-gray-700 text-lg">My Index Card Sets</h1>

      <button
        className="rounded bg-indigo-500 text-white text-sm px-2 py-3 font-medium shadow"
        id="open-create-modal"
      >
        Create New Index Card Set
      </button>
    </div>
  );
}

export function Page() {
  const [state, setState] = useState(getState());
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    function listener() {
      setCreateModalOpen(true);
    }

    document
      .querySelector("#open-create-modal")
      .addEventListener("click", listener);
  }, []);

  useEffect(() => {
    persistState(state);
  }, [state]);

  return (
    <>
      <div
        className={classNames(
          "border-4 bg-gray-50 border-dashed border-gray-200 rounded-lg flex",
          state.sets.length === 0
            ? "h-96 flex-col items-center justify-center"
            : "p-10"
        )}
      >
        {state.sets.length === 0 ? (
          <p className="text-sm text-gray-500">
            You haven't created any index card sets yet.
          </p>
        ) : (
          <div className="flex flex-wrap -m-2">
            {state.sets.map((set) => (
              <div
                key={set.id}
                className="bg-white shadow bg-white rounded m-2 w-96 overflow-hidden"
              >
                <div className="font-medium text-indigo-500 p-5 text-center">
                  {set.title}
                </div>

                <div className="bg-gray-50 border-t-4 border-gray-100 px-5 py-3 flex items-center justify-around">
                  <button
                    className="text-sm text-gray-400 font-medium"
                    onClick={() => {
                      if (window.confirm("Wirklich löschen? tbd")) {
                        setState((state) => ({
                          ...state,
                          sets: state.sets.filter(({ id }) => id !== set.id),
                        }));
                      }
                    }}
                  >
                    Remove
                  </button>
                  <Link
                    to={`/set/${set.id}`}
                    className="text-sm text-indigo-500 font-medium"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateSetModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        addSet={({ title, tags }) => {
          setState((state) => ({
            ...state,
            sets: [...state.sets, { title, tags, id: Date.now() }],
          }));
          return Promise.resolve();
        }}
      />
    </>
  );
}
