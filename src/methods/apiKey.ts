export const getAPIKey = (): string => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (apiKey === undefined) {
        const message = `
            You need to set the environment variable VITE_OPENWEATHER_API_KEY.
            You can do this in the following ways:
            1) export VITE_OPENWEATHER_API_KEY="your-api-key", then run the application again.
            2) Set the API key in the '.env.local' file.
            3) Prepend the API key to the command line, e.g. 'VITE_OPENWEATHER_API_KEY="your-api-key" yarn dev'.
            `;
        throw new Error(message); // TODO: Add a client-friendly error message.
    }
    return apiKey;
}

export default getAPIKey;