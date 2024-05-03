import {UserType} from "./user";

export type TeamType = {
    id: number;
    teamName: string;
    description: string;
    maxNum: number;
    expireTime: Date;
    status: number;
    password?: string;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    userId: number;
    hasJoin: boolean;
};
