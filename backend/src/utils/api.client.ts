export const apiRequest = async <T>(
    url: string,
    options: RequestInit = {},
    timeout: number = 5000 //default 5 sec
): Promise<T> => {

    // setup time logic 
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });


        if (!response.ok) {
            throw new Error(`HTTP error ${response.status} - ${response.statusText}`);
        }

        return await response.json() as T;

    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeout}ms`);
        }

        throw error;

    } finally {
        clearTimeout(id)
    }
}