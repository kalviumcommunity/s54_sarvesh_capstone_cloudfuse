import { useState } from "react";
import axios from "axios";
import { FormData } from "form-data";
// Replace with your actual VirusTotal API key
const apiKey =
  "210d1c2f051d2e1ca746399b87409805c8686b255dc6c06c4290eeb457810bb5";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadError(null); // Clear previous error on new file selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://www.virustotal.com/api/v3/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
          },
        }
      );

      const scanId = response.data.data.id;
      console.log(`File uploaded successfully. Scan ID: ${scanId}`);

      // (Optional) Retrieve scan results later
      // You can implement a separate function to fetch and display results
      // based on the scan ID

      setScanResult({ message: "Scan initiated. Results pending..." });
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("An error occurred during upload. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload and Scan"}
      </button>
      {uploadError && <p className="error-message">{uploadError}</p>}
      {scanResult && (
        <p>
          {scanResult.message || "Scan Results:"}
          {/* Display retrieved scan results here (if implemented) */}
        </p>
      )}
    </form>
  );
};

export default UploadForm;
