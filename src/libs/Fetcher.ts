enum HttpMethod {
	GET = 'GET',
	DELETE = 'DELETE',
	HEAD = 'HEAD',
	OPTIONS = 'OPTIONS',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH'
}

interface HttpClient {
	get<T>(url: string, config?: RequestInit): Promise<T>;
	delete<T>(url: string, config?: RequestInit): Promise<T>;
	head<T>(url: string, config?: RequestInit): Promise<T>;
	options<T>(url: string, config?: RequestInit): Promise<T>;
	post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
	put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
	patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

const TEST_API_URL = 'https://jsonplaceholder.typicode.com/' as string;

class Fetcher implements HttpClient {
	private readonly baseUrl: string;
	private readonly headers: Record<string, string>;

	constructor(baseUrl: string = TEST_API_URL) {
		this.baseUrl = baseUrl;
		this.headers = { csrf: 'token', Referer: this.baseUrl };
	}

	private async request<T>(method: HttpMethod, url: string, data?: unknown, config?: RequestInit): Promise<T> {
		try {
			const response = await fetch(`${this.baseUrl}${url}`, {
				method,
				headers: {
					...this.headers,
					'Content-Type': 'application/json',
					...config?.headers
				},
				credentials: 'include',
				body: data ? JSON.stringify(data) : undefined,
				...config
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			return response.json() as T;
		} catch (error) {
			console.error('Fetcher Error:', error);
			throw error;
		}
	}

	public get<T>(url: string, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.GET, url, undefined, config);
	}

	public delete<T>(url: string, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.DELETE, url, undefined, config);
	}

	public head<T>(url: string, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.HEAD, url, undefined, config);
	}

	public options<T>(url: string, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.OPTIONS, url, undefined, config);
	}

	public post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.POST, url, data, config);
	}

	public put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.PUT, url, data, config);
	}

	public patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
		return this.request<T>(HttpMethod.PATCH, url, data, config);
	}
}

export default Fetcher;
