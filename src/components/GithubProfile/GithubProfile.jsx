import React, { useState, useEffect } from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";

function GitHubProfile() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [commits, setCommits] = useState([]);
    const username = 'mabsrencode';
    const accessToken = "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";
    useEffect(() => {
        const fetchData = async () => {
            let reposData = [];
            try {
                const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                });
                if (profileResponse.ok) {
                    const userData = await profileResponse.json();
                    setUser(userData);
                } else {
                    console.error('Error fetching user profile:', profileResponse.status);
                }
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                });
                if (reposResponse.ok) {
                    reposData = await reposResponse.json();
                    setRepos(reposData);
                } else {
                    console.error('Error fetching user repositories:', reposResponse.status);
                }
                const commitsData = [];

                await Promise.all(reposData.map(async (repo) => {
                    try {
                        const commitResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=2`, {
                            headers: {
                                Authorization: `token ${accessToken}`,
                            },
                        });
                        if (commitResponse.ok) {
                            const repoCommits = await commitResponse.json();
                            commitsData.push(...repoCommits);
                        } else {
                            console.error(`Error fetching commits for ${repo.name}:`, commitResponse.status);
                        }
                    } catch (error) {
                        console.error(`Error fetching commits for ${repo.name}:`, error);
                    }
                }));

                setCommits(commitsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [username, accessToken]);

    return (
        <div className="">
            {user && (
                <div className="bg-gray m-12 rounded border border-white p-2 px-4 text-white shadow-xl shadow-inner">
                    <h1 className='text-xl'>Profile Status</h1>
                    <p className='text-xs opacity-50'>Username: {user.login}</p>
                    <p className='text-xs opacity-50'>Name: {user.name}</p>
                    <p className='text-xs opacity-50'>Followers: {user.followers}</p>
                    <p className='text-xs opacity-50'>Following: {user.following}</p>
                </div>
            )}
            <h1>Repository Lists</h1>
            <ul className="">
                {repos.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
            <h2>Latest Commits</h2>
            <div className="w-[32rem]">
                <Timeline >
                    {commits.map((commit) => (
                        <TimelineItem key={commit.sha}>
                            <TimelineConnector />
                            <TimelineHeader className="h-3">
                                <TimelineIcon />
                                <Typography variant="h6" color="blue-gray" className="leading-none">
                                    Commit Message: {commit.commit.message}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography variant="small" color="gray" className="font-normal text-gray-600">
                                    Commit Author: {commit.commit.author.name}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal text-gray-600">
                                    Commit Date: {commit.commit.author.date}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </div>
    );
}

export default GitHubProfile;
