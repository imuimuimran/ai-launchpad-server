import app from "./app";
import { connectDB } from "./config/db";

const PORT =
  process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on ${PORT}`
//   );
// });

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Server running on ${PORT}`
    );
  });
}

bootstrap();