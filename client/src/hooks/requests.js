const API_URL = "http://localhost:8000";
const VERSION = "v1";

// Load planets and return as JSON
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/${VERSION}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/${VERSION}/launches`);
  const fetchLaunches = await response.json();
  return fetchLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/${VERSION}/launches`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (launchError) {
    return { ok: false };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    console.log(`${API_URL}/${VERSION}/launches/${id}`);
    return await fetch(`${API_URL}/launches/${id}`, { method: "delete" });
  } catch (abortError) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
