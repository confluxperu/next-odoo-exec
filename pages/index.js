import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [form, setForm] = useState({
		odoo_url: '',
		odoo_db: '',
		odoo_port: '8069',
		odoo_user: '',
		odoo_pwd: '',
		odoo_model: 'res.users',
		odoo_method: 'search_read',
		odoo_args: '[[["active","=",true]],["name","login"]]',
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const setField = (field) => (e) => {
		setForm({ ...form, [field]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const rawResponse = await fetch('api/odoo', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: form.odoo_url,
				db: form.odoo_db,
				port: parseInt(form.odoo_port),
				user: form.odoo_user,
				pwd: form.odoo_pwd,
				model: form.odoo_model,
				method: form.odoo_method,
				args: form.odoo_args,
			}),
		});
		setLoading(false);
		const contentTxt = await rawResponse.text();

		console.log(content);
		setMessage(contentTxt);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Execute Odoo function</title>
				<meta name="description" content="Conflux Execute Odoo function" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Odoo Remote Function Execution{' '}
					<a href="https://conflux.pe">Conflux!</a>
				</h1>

				<form action="api/odoo" method="POST">
					<div>
						<label htmlFor="odoo_url">URL</label>
						<input
							type="text"
							id="odoo_url"
							value={form.odoo_url}
							onChange={setField('odoo_url')}
							placeholder="http://odoo.com"
						/>
					</div>
					<div>
						<label htmlFor="odoo_db">DB</label>
						<input
							type="text"
							id="odoo_db"
							value={form.odoo_db}
							onChange={setField('odoo_db')}
							placeholder="bd_myodoo"
						/>
					</div>
					<div>
						<label htmlFor="odoo_port">Port</label>
						<input
							type="text"
							id="odoo_port"
							value={form.odoo_port}
							onChange={setField('odoo_port')}
							placeholder="8069"
						/>
					</div>
					<div>
						<label htmlFor="odoo_user">User Name</label>
						<input
							type="text"
							id="odoo_user"
							value={form.odoo_user}
							onChange={setField('odoo_user')}
							placeholder="admin"
						/>
					</div>
					<div>
						<label htmlFor="odoo_pwd">Password</label>
						<input
							type="password"
							id="odoo_pwd"
							value={form.odoo_pwd}
							onChange={setField('odoo_pwd')}
							placeholder="123456"
						/>
					</div>
					<div>
						<label htmlFor="odoo_model">Model</label>
						<input
							type="text"
							id="odoo_model"
							value={form.odoo_model}
							onChange={setField('odoo_model')}
							placeholder="http://odoo.com"
						/>
					</div>
					<div>
						<label htmlFor="odoo_method">Method</label>
						<input
							type="text"
							id="odoo_method"
							value={form.odoo_method}
							onChange={setField('odoo_method')}
							placeholder="http://odoo.com"
						/>
					</div>
					<div>
						<label htmlFor="odoo_args">Arguments</label>
						<textarea
							id="odoo_args"
							value={form.odoo_args}
							onChange={setField('odoo_args')}
							placeholder='[ "my_argument1", 2, "arg3", false ]'
						></textarea>
					</div>
					{loading ? (
						<span>cargando...</span>
					) : (
						<button type="submit" onClick={handleSubmit}>
							Call method
						</button>
					)}
				</form>
				<div>{message !== '' && message}</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://conflux.pe?utm_source=odoo-execute&utm_medium=default-template&utm_campaign=odoo-execute"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/logo.png" alt="Conflux Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
