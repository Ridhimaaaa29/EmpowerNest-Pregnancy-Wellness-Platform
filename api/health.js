export default function handler(req, res) {
  res.status(200).json({
    message: 'EmpowerNest Backend is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
}
