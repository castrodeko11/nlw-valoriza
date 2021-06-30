import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagService";


class ListTagsController {

    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();
        // let tags = await listTagsService.execute();
        // tags = tags.map((tag) => ({
        //     ...tag, nameCustom: `#${tag.name}`
        // }));

        return response.json(tags);
    }
}

export { ListTagsController }


