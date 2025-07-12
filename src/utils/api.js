import axios from "axios";

export const fetchData = async (url) => {
  try {
    const fullURL = import.meta.env.VITE_BASE_URL + url;

    const { data } = await axios.get(fullURL);
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

export const postData = async (url, payload) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + url,
      payload,

      {
        timeout: 10000,
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return {
      success: false,
      message: error.response?.data?.msg || error.message || "Network error",
    };
  }
};

export const putData = async (url, payload) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + url,
      payload,
      {
        timeout: 10000,
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error putting data:", error);
    return {
      success: false,
      message: error.response?.data?.msg || error.message || "Network error",
    };
  }
};

export const removeData = async (url) => {
  try {
    const fullURL = import.meta.env.VITE_BASE_URL + url;

    const response = await axios.delete(fullURL);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    return {
      success: false,
      message: error.response?.data?.msg || error.message || "Network error",
    };
  }
};
