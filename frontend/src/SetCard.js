import { useEffect, useRef, useState } from 'react';
import { secondsUntilAnswer } from './Store';
import classNames from 'classnames';

export default function SetCard({ card }) {
	const [showAnswer, setShowAnswer] = useState(false);
	const answerInterval = useRef();

	useEffect(() => {
		function checkAnswerVisibility() {
			const shouldShow = (card.createdAt + (secondsUntilAnswer * 1000)) <= Date.now();

			if (shouldShow) {
				setShowAnswer(true);

				clearInterval(answerInterval.current);
				answerInterval.current = null;
			}
		}

		checkAnswerVisibility();

		answerInterval.current = setInterval(checkAnswerVisibility, 5000);
	}, [card.createdAt]);

	return (
		<div className="w-10/12 odd:ml-auto bg-gray-50 shadow rounded p-5 mt-10 overflow-hidden">
			<div className="text-md font-medium leading-6 text-gray-600 mb-3 border-b-2 -mx-5 -mt-5 pt-5 px-5 pb-5 bg-orange-50">
				{card.question}
			</div>

			<p dangerouslySetInnerHTML={{ __html: showAnswer ? card.answer.replaceAll('\n', '<br />') : 'Generating answer...' }} className={classNames("py-3", showAnswer ? 'text-gray-600' : 'text-gray-400 italic text-sm')}/>

			{card.tags.length > 0 && (
				<div className="mt-3 -mx-5 px-5 border-t-2 pt-3 border-gray-100 flex flex-wrap -m-1">
					{card.tags.map(tag => (
						<div
							key={tag}
							className="bg-gray-300 text-gray-600 text-xs font-medium rounded-full px-2 py-1 m-1"
						>
							{tag}
						</div>
					))}
				</div>
			)}
		</div>
	);
}