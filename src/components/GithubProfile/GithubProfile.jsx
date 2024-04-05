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
import SkeletonLoader from '../SkeletonLoader/SkeletonLoaderRepos';

function GitHubProfile() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [commits, setCommits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const username = 'mabsrencode';
    const accessToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

    const styleIcon = {
        backgroundColor: "red",
        width: "10px",
        height: "10px",
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
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
                    console.log(userData);
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
                    // console.log(reposData);
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [username, accessToken]);

    return (
        <div className="">
            {isLoading ? (<SkeletonLoader />) : (<div>
                {user && (
                    <div className='flex gap-2 justify-center w-full flex-wrap p-2 bg-gray rounded'>
                        <div className="bg-gray grow rounded border lg:max-w-[30%] border-white p-4 text-white shadow-xl shadow-inner">
                            <div className='flex items-center gap-4'>
                                <img src={user.avatar_url} alt="avatar" className='h-14 w-14 rounded-full' />
                                <h1 className='text-4xl'>Profile Status</h1>
                            </div>
                            <h2 className='text-md opacity-50'>Username: {user.login}</h2>
                            <h2 className='text-md opacity-50'>Name: {user.name}</h2>
                            <h2 className='text-md opacity-50'>Followers: {user.followers}</h2>
                            <h2 className='text-md opacity-50'>Following: {user.following}</h2>
                            <h2 className='text-md opacity-50'>Private Repository: {user.owned_private_repos}</h2>
                            <h2 className='text-md opacity-50'>Public Repository: {user.public_repos}</h2>
                            <p className='text-xs opacity-50 mt-4'>{user.bio}</p>
                        </div>
                        <div className='grow border border-white p-4 rounded text-white'>
                            <h2 className='text-4xl mb-4'>Latest Commits</h2>
                            <div className="max-h-72  overflow-y-scroll">
                                <Timeline className='mt-4'>
                                    {commits.map((commit) => (
                                        <TimelineItem key={commit.sha}>
                                            <TimelineConnector style={styleIcon} />
                                            <TimelineHeader className="h-3">
                                                <TimelineIcon />
                                                <Typography variant="h6" className="leading-none opacity-50">
                                                    Commit Message: {commit.commit.message}
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody className="pb-8">
                                                <Typography variant="small" className="font-normal opacity-50">
                                                    Commit Author: {commit.commit.author.name}
                                                </Typography>
                                                <Typography variant="small" className="font-normal opacity-50">
                                                    Commit Date: {commit.commit.author.date}
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        </div>
                        <div className='grow  border border-white p-4 rounded  text-white'>
                            <h1 className='text-4xl'>Repository Lists</h1>
                            <ul className='h-[290px] overflow-y-scroll  mt-4'>
                                {repos.map((repo) => (
                                    <li key={repo.id} className='list-disc ml-8 opacity-50'>{repo.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>)}
        </div>
    );
}

export default GitHubProfile;
