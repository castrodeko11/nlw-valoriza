import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceiveComplimentsService {
    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        console.log(user_id);


        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        });

        return compliments;
    }
}


export { ListUserReceiveComplimentsService }