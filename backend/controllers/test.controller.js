//Test connection

export const testConnection = async (req, res) => {
  try {
    res.status(200).json("conenction is alive");
  } catch (error) {
    res.status(500).json("Something went wrong please check error message", error);
  }
};
