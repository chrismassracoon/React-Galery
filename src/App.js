import React from 'react';
import './index.scss';
import Collection from './Collection';
import { useEffect } from 'react';
import { useState } from 'react';

const cats = [
	{ "name": "All" },
	{ "name": "Sea" },
	{ "name": "The mountains" },
	{ "name": "Architecture" },
	{ "name": "Cities" }
]

function App() {
	const [category, setCategory] = useState(0);
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [collection, setCollection] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		setLoading(true);
		fetch(`https://633f0d390dbc3309f3c3efb9.mockapi.io/Galery?page=${page + 1}&category=${category ? category : ''}&limit=3`)
			.then(res => res.json())
			.then(res => { setCollection(res) })
			.catch(err => {
				console.log(err);
				alert('Smth wrong, error getting data')
			})
			.finally(() => setLoading(false))
	}, [category, page]);
	return (
		<div className="App">
			<h1>My photo collection</h1>
			<div className="top">
				<ul className="tags">
					{cats.map((obj, i) => <li onClick={() => setCategory(i)} className={category === i ? 'active' : ''}>{obj.name}</li>)}
				</ul>
				<input value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" placeholder="Search by name" />
			</div>
			<div className="content">
				{loading ? <h2>Loading...</h2> : (collection.filter(i => {
					return i.name.toLowerCase().includes(search.toLowerCase())
				}).map((obj, i) =>
					<Collection
						key={i}
						name={obj.name}
						images={obj.photos}
					/>))}
			</div>
			<ul className="pagination">
				{[...Array(3)].map((_, index) => {
					return <li onClick={() => setPage(index)} className={page == index ? 'active' : ''} key={index}>{index + 1}</li>
				})}
			</ul>
		</div>
	);
}

export default App;
