import { logger } from './config';
import createApp from './app';

const PORT = process.env.PORT || 3001;
const app = createApp();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});