import { Challenge } from "../entity/Challenge";
import Repository from "./Repository";

export default interface ChallengeRepository extends Repository<string, Challenge> {}
