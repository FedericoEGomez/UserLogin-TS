import { Request, Response } from 'express';

class IndexController {
    index(req: Request, res: Response) {
        res.send('Hello World!')}
}

export default new IndexController