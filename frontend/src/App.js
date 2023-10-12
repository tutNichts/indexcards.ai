import './App.css';
import { Routes, BrowserRouter, NavLink, Route } from 'react-router-dom';
import * as Overview from './Overview';
import * as Show from './Show';

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<nav className="bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center">
								<div className="flex-shrink-0 flex items-center">
									<img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>

									<div className="text-indigo-400 font-semibold ml-3">indexcards.ai</div>
								</div>
								<div className="hidden md:block">
									<div className="ml-5 flex items-baseline space-x-4">
										<NavLink to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">My Index Cards</NavLink>

										<a href="asd" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">FAQ</a>

										<a href="asd" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
									</div>
								</div>
							</div>
							<div className="hidden md:block">
								<div className="ml-4 flex items-center md:ml-6">
									<button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
										<span className="sr-only">View notifications</span>
										<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
										</svg>
									</button>

									<div className="ml-3 relative">
										<div>
											<button type="button" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
												<img className="h-8 w-8 rounded-full" src="https://gravatar.com/avatar/6b0d915292522cfb19403c49e302b2e5" alt=""/>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>

				<header className="bg-white z-10 shadow relative">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<Routes>
							<Route index element={<Overview.Title/>} />
							<Route path="/set/:id" element={<Show.Title/>} />
						</Routes>
					</div>
				</header>
				<main className="bg-gray-50 z-0 flex-grow">
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="px-4 py-6 sm:px-0">
							<Routes>
								<Route index element={<Overview.Page/>} />
								<Route path="/set/:id" element={<Show.Page/>} />
							</Routes>
						</div>
					</div>
				</main>
			</div>
		</BrowserRouter>
	);
}
