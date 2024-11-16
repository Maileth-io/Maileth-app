import axios from "axios";

const akaveApiUrl = process.env.NEXT_PUBLIC_AKAVE_API_URL || "https://api.akave.ai/v1/upload";
const akaveApiKey = process.env.NEXT_PUBLIC_AKAVE_API_KEY || "";

export const uploadImageToAkave = async (imageFile: File) => {
    if (!akaveApiKey) {
        throw new Error("Akave API key is missing. Please check your .env.local configuration.");
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
        const response = await axios.post(akaveApiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${akaveApiKey}`,
            },
        });

        return response.data; // Returns the uploaded file's URL or metadata
    } catch (error) {
        console.error("Error uploading image to Akave:", error);
        throw error;
    }
};
