"use server";

// Mock subscriber count data for demo purposes
export async function getSubscriberCount() {
  // In a real application, you would fetch this from a database
  const mockCount = Math.floor(1000 + Math.random() * 500);

  return {
    success: true,
    data: {
      count: mockCount.toLocaleString(),
    },
  };
}
