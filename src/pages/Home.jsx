import React from 'react'
import Projects from '../components/Projects/Projects'
import GitHubProfile from '../components/GithubProfile/GithubProfile'

const Home = () => {
    return (
        <div className='bg-gray-dark'>
            <GitHubProfile />
            <Projects />
        </div>
    )
}

export default Home