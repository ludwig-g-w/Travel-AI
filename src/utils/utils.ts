export const copyToClipboard = async (text?: string) => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    // Optionally add a success notification here
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // Optionally add an error notification here
  }
};
