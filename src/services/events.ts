const API = "https://re-ems-backend.onrender.com/api/v1/public";

export async function getEvents() {
    const response = await fetch(`${API}/events/`);

    if (!response.ok)
        throw new Error("Failed to fetch events");

    return response.json();
}

export async function getEvent(slug: string) {
    const response = await fetch(`${API}/events/${slug}/`);

    if (!response.ok)
        throw new Error("Failed");

    return response.json();
}