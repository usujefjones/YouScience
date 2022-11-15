import {apiHost} from '../api_host.js';

export const getTasks = () => {
	return fetch(`${apiHost}tasks`, {
		method: 'get',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials" : 'true',
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,POST,DELETE,HEAD,PUT,OPTIONS",
			"Access-Control-Allow-Headers": "Content-type,Accept,X-Custom-Header, x-requested-with",
		},
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	})
	.then(response => {
		return response && response.length > 0 ? response : [];
	})
	.catch( error =>  console.log(error) );
}

export const createTask = (task) => {
	return fetch(`${apiHost}tasks/`, {
		method: 'post',
		body: JSON.stringify(task),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials' : 'true',
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,POST,DELETE,HEAD,PUT,OPTIONS",
			"Access-Control-Allow-Headers": "Content-type,Accept,X-Custom-Header, x-requested-with",
		},
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return true;
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
			return false;
		}
	})
	.catch( error =>  console.log(error) );
}

export const deleteTask = (id) => {
	return fetch(`${apiHost}tasks/delete/${id}`, {
		method: 'get',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials' : 'true',
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,POST,DELETE,HEAD,PUT,OPTIONS",
			"Access-Control-Allow-Headers": "Content-type,Accept,X-Custom-Header, x-requested-with",
		},
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return true;
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
			return false;
		}
	})
	.catch( error =>  console.log(error) );
}

export const updateTask = (task) => {
	return fetch(`${apiHost}tasks/update`, {
		method: 'post',
		body: JSON.stringify(task),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials' : 'true',
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,POST,DELETE,HEAD,PUT,OPTIONS",
			"Access-Control-Allow-Headers": "Content-type,Accept,X-Custom-Header, x-requested-with",
		},
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return true;
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
			return false;
		}
	})
	.catch( error =>  console.log(error) );
}
