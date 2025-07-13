export const getError = (error: unknown): { message: string; status: number } => {
  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "message" in (error as any).data
  ) {
    return {
      message: (error as any).data.message,
      status: Number((error as any).status) || 500,
    };
  }

  return {
    message: "Something went wrong",
    status: 500,
  };
};
