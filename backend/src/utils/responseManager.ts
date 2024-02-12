export const sendSuccessResponse = (res: any, data: any, message: string) => {
  res.status(200).json({ success: true, message, data });
};

export const sendErrorResponse = (res: any, error: any) => {
  console.log(error);
  res.status(500).json({ success: false, message: error.message });
};
