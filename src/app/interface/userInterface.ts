import { ActivatedRoute } from "@angular/router";

/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/

export interface ProviderData {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
}
export interface User {
    uid: string;
    photoURL: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    providerId: string;
    providerData: ProviderData[];
}
export interface UserAppSetting extends User {
    SelectedOrgAppKey: string;
    SelectedTeamId: string;
    AboutMe: string;
    AppTheme: string;
    GithubProfile: string;
    LinkedInProfile: string;
    DateOfJoining: string;
    Skills: string[];
    Education: string;
    Experience: string;
    Projects: string;
    Website: string;
    Username: string;
    UserPostsCounter: number;
    UserReactionCounter: number;
    UserCommentCounter: number;
}

export interface UserBasicSetting extends User{
    uid: string;
    Username: string;
    displayName: string;
    email: string;
    photoURL: string;
    AboutMe: string
}


export const defaultUser = {
    uid: "defaultUser",
    photoURL: "../../../assets/defaultavatar.jpg",
    displayName: "Default User",
    email: "defaultUser@worktez.com",
    phoneNumber: null,
    providerId: "worktez",
    SelectedOrgAppKey: "",
    SelectedTeamId: "",
    AboutMe: "",
    AppTheme: "",
    GithubProfile: "",
    LinkedInProfile: "",
    DateOfJoining: "",
    Skills: "",
    Education: "",
    Experience: "",
    Projects: "",
    Website: "",
    Username: "",
    providerData: [],
};

export interface MemberData{
    Active: boolean;
    DateOfOnboarding: string;
    DateOfExit: string;
    IsAdmin: boolean;
    TeamManager: boolean;
    Teams: [];
    Email: string;
}

