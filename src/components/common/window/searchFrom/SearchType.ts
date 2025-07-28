export interface IList {
    id: string;
    company: string;
    projectName: string;
    tools : string[];
    link : string;
    language : string[];
    platform : string[];
    kws : string[];
}

export type ProjectListResponse = {
    project: IList[];
};


export interface IWorksArray extends Array<IList> {}