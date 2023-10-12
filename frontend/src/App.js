import "./App.css";
import { Routes, BrowserRouter, NavLink, Route } from "react-router-dom";
import * as Overview from "./Overview";
import * as Show from "./Show";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />

                  <div className="text-indigo-400 font-semibold ml-3">
                    indexcards.ai
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-5 flex items-baseline space-x-4">
                    <NavLink
                      to="/"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      My Index Cards
                    </NavLink>

                    <a
                      href="asd"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      FAQ
                    </a>

                    <a
                      href="asd"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://gravatar.com/avatar/6b0d915292522cfb19403c49e302b2e5"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>

                  <div className="ml-3 relative">
                    <button
                      type="button"
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_0_3)">
                          <path
                            d="M3.84094 13.125H16.8747C17.496 13.125 17.9997 12.6213 17.9997 12C17.9997 11.3787 17.496 10.875 16.8747 10.875H3.84094L5.29548 9.42048C5.73482 8.98113 5.73482 8.26886 5.29548 7.82951C4.85621 7.39016 4.14386 7.39016 3.70451 7.82951L0.329684 11.2044C0.303359 11.2307 0.278459 11.2583 0.254909 11.2871C0.244634 11.2997 0.23571 11.3129 0.226035 11.3258C0.21366 11.3423 0.20091 11.3584 0.189435 11.3756C0.178935 11.3912 0.16986 11.4075 0.16026 11.4236C0.151035 11.439 0.14136 11.4541 0.132885 11.47C0.124035 11.4865 0.11661 11.5034 0.10866 11.5202C0.10086 11.5367 0.0926854 11.5529 0.0857105 11.5697C0.0789605 11.5861 0.0734106 11.6028 0.0674856 11.6195C0.0609606 11.6375 0.0540607 11.6552 0.0485107 11.6736C0.0434858 11.6903 0.0398108 11.7071 0.0356108 11.724C0.0308858 11.7427 0.0256359 11.7613 0.0218859 11.7803C0.0180609 11.7998 0.0157359 11.8194 0.012961 11.839C0.010561 11.8557 0.00733599 11.8722 0.005686 11.8892C0.00208602 11.9255 0.000211034 11.962 0.000136035 11.9984C0.000136035 11.999 6.10352e-05 11.9996 6.10352e-05 12.0001C6.10352e-05 12.0006 0.000136035 12.0012 0.000136035 12.0017C0.000211034 12.0383 0.00208602 12.0747 0.005686 12.1111C0.00733599 12.1278 0.010486 12.1441 0.012811 12.1607C0.0156609 12.1805 0.0179859 12.2003 0.0218859 12.2199C0.0256359 12.2388 0.0308108 12.2571 0.0355358 12.2756C0.0398108 12.2927 0.0435608 12.3098 0.0486607 12.3267C0.0541357 12.3448 0.0609607 12.3623 0.0672606 12.38C0.0733356 12.3969 0.0788855 12.4139 0.0857855 12.4306C0.0926105 12.4471 0.100635 12.4629 0.108285 12.479C0.116385 12.4962 0.124035 12.5135 0.133035 12.5304C0.141285 12.5458 0.15066 12.5604 0.159585 12.5753C0.16941 12.5919 0.178785 12.6086 0.189585 12.6248C0.200535 12.6412 0.21276 12.6566 0.224535 12.6724C0.234735 12.686 0.244185 12.7 0.255059 12.7132C0.277484 12.7405 0.301259 12.7667 0.326084 12.7918C0.327284 12.793 0.328259 12.7943 0.329459 12.7955L3.70444 16.1706C3.92419 16.3903 4.21203 16.5001 4.49996 16.5001C4.78781 16.5001 5.0758 16.3903 5.2954 16.1707C5.73475 15.7313 5.73475 15.019 5.29548 14.5797L3.84094 13.125Z"
                            fill="#9ca3af"
                          />
                          <path
                            d="M22.875 1.875H8.62508C8.00379 1.875 7.50009 2.3787 7.50009 2.99999V7.49996C7.50009 8.12126 8.00379 8.62496 8.62508 8.62496C9.24638 8.62496 9.75008 8.12126 9.75008 7.49996V4.12499H21.75V19.875H9.75008V16.4999C9.75008 15.8786 9.24638 15.3749 8.62508 15.3749C8.00379 15.3749 7.50009 15.8786 7.50009 16.4999V21C7.50009 21.6213 8.00379 22.1249 8.62508 22.1249H22.875C23.4963 22.1249 24 21.6213 24 21V2.99999C24 2.3787 23.4963 1.875 22.875 1.875Z"
                            fill="#9ca3af"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_3">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <header className="bg-white z-10 shadow relative">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<Overview.Title />} />
              <Route path="/set/:id" element={<Show.Title />} />
            </Routes>
          </div>
        </header>
        <main className="bg-gray-50 z-0 flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Routes>
                <Route index element={<Overview.Page />} />
                <Route path="/set/:id" element={<Show.Page />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
