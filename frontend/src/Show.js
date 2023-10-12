import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getState, persistState, storedCards } from './Store';
import SetCard from './SetCard';

export function Title() {
	const { id: setId } = useParams();
	const set = useMemo(() => getState().sets?.find(({ id }) => id.toString() === setId), [setId]);

	return <h1 className="font-medium text-gray-700 text-lg">{set.title}</h1>;
}

export function Page() {
	const { id: setId } = useParams();
	const [set, updateSet] = useState(getState().sets?.find(({ id }) => id.toString() === setId));

	useEffect(() => {
		const state = getState();

		persistState({
			...state,
			sets: [...state.sets.filter(({ id }) => id !== set.id), set].sort((a, b) => a.id > b.id ? 1 : -1)
		});
	}, [set]);

	const questionProposals = useMemo(() => {
		const tagsCommaSeparated = set.tags.join(',').toLowerCase();
		return storedCards
			.filter(({ tags }) => tags.some(tag => tagsCommaSeparated.includes(tag.toLowerCase())))
			.filter(({ question: storedCardQuestion }) => !set.cards?.some(({ question }) => storedCardQuestion === question));
	}, [set]);

	function addCard({ question, answer, tags }) {
		updateSet(currentSet => ({
			...currentSet,
			cards: [
				...currentSet.cards ?? [],
				{
					question,
					answer: answer ?? 'Wieso, weshalb, warum?',
					tags: tags ?? ['Wieso?', 'Weshalb?', 'Warum?'],
					createdAt: Date.now()
				}]
		}));
	}

	return (
		<div className="flex items-stretch">
			<main className="w-2/3 flex-shrink-0 py-5">
				<div className="bg-indigo-200 shadow rounded p-5 text-sm text-indigo-900 leading-loose">
					<span className="font-medium">We are processing your uploaded lecture notes.</span><br />
					Feel free to create your own index cards with our supportive AI in the meantime.
				</div>

				<div className="bg-white shadow rounded p-5 mt-10">
					<textarea
						required
						placeholder="How does DNS work?"
						className="rounded bg-white border border-gray-200 p-3 resize-none w-full"
						rows={3}
						onKeyDown={event => {
							if (event.target.value.length < 10) {
								return;
							}

							if (event.key === 'Enter') {
								const question = event.target.value;
								addCard({ question });
								event.target.value = '';
							}
						}}
					/>
				</div>

				{questionProposals.length > 0 && (
					<div className="bg-indigo-50 shadow rounded p-5 mt-10">
						<h3 className="text-lg font-medium leading-6 text-gray-600 mb-3">
							Index Card Suggestions from our AI
						</h3>

						<div className="flex flex-wrap -m-1">
							{questionProposals.map(question => (
								<button
									type="button"
									key={question.question}
									className="bg-indigo-500 text-white text-xs font-medium rounded-full px-2 py-1 m-1"
									onClick={() => {
										addCard(question);
									}}
								>
									{question.question}
								</button>
							))}
						</div>
					</div>
				)}

				{set.cards?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1).map(card => <SetCard key={card.createdAt} card={card}/>)}
			</main>
			<aside className="border-l-4 border-gray-100 border-dashed pl-5 ml-10 py-5">
				{set.tags?.length > 0 ? (<>
					<h2 className="font-medium mb-3 text-gray-600">Tags</h2>

					<div className="flex flex-wrap">
						{set.tags.map(tag => (
							<span
								key={tag}
								className="bg-gray-300 text-gray-600 text-xs font-medium rounded-full px-2 py-1 m-1"
							>
								{tag}
							</span>
						))}
					</div>
				</>) : (
					<div className="text-gray-400 text-sm">No tags selected.</div>
				)}
			</aside>
		</div>
	);
}
