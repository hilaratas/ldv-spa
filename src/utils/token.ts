const LOCAL_ACCESS_NAME = 'jwt-token';

function setAccessToken(accessToken :string){
	localStorage.setItem(LOCAL_ACCESS_NAME, accessToken);
}

function cleanAccessToken(){
	localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getAccessToken(){
	return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getJWTPayload(token :string){
	return parseJWT(token).payload;
}

function parseJWT(token :string){
	let parts = token.split('.');

	return {
		header: parsePart(parts[0]),
		payload: parsePart(parts[1]),
		sign: parts[2]
	};
}

function parsePart(str: string){
	return JSON.parse(window.atob(str));
}

export { setAccessToken, cleanAccessToken, getJWTPayload, getAccessToken }