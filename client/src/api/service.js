// const options = {
//     method: "POST",
//     headers: "'Content-Type': 'application/json'",
//     body: JSON.stringify(data)
// }

export async function fetchResponse(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw Error("Network response was not OK.");
    }
    const jsonData = await res.json();
    console.log("Response fetched successfully!");
    console.log("Response: ", jsonData);
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}
