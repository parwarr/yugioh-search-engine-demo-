// import { Get, Res, StreamableFile } from '@nestjs/common';
// import { createReadStream } from 'fs';
// import { join } from 'path';
// import type { Response } from 'express';

// export class FileController {
//   @Get()
//   getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
//     const file = createReadStream(join(process.cwd(), 'package.json'));
//     res.set({
//       'Content-Type': 'application/json',
//       'Content-Disposition': 'attachment; filename="package.json"',
//     });
//     return new StreamableFile(file);
//   }
// }
