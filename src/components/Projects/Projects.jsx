import React, { useEffect, useState } from 'react';
import "./projects.css"
const Projects = (props) => {
    const netlifyToken = 's2Xr4pVRR8wyd8FhauhPMYBzaDU3xH5HeCP11NUigAI';
    const [siteInfo, setSiteInfo] = useState([]);
    useEffect(() => {
        const siteIds = ['d34405b3-2ad1-4404-825c-2cdaae77e7c7', 'e1c3d229-fd4f-4007-815b-970c854c4fa8', "8f66d06e-8224-435d-8aa9-ba9314fa2377",
            '767c245e-97f8-4656-90fa-e29f5762e17f', "c66d2370-6818-4d6b-95a5-bdeadb8c7932", "da426abc-cbca-4a61-9015-eb476c33aece", "85fd0e2e-5b42-498d-9fc9-9eb6e43de947"]; // Add your site IDs

        const fetchSiteInfo = async () => {
            const siteData = await Promise.all(
                siteIds.map(async (siteId) => {
                    try {
                        const response = await fetch(
                            `https://api.netlify.com/api/v1/sites/${siteId}`,
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${netlifyToken}`,
                                },
                            }
                        );
                        if (response.ok) {
                            const data = await response.json();
                            return {
                                siteId,
                                name: data.name,
                                url: data.url,
                                screenshot: data.screenshot_url,
                                dateCreated: data.created_at //!language
                            };
                        } else {
                            console.error(`Error fetching site info for site ${siteId}`);
                            return {
                                siteId,
                                name: 'Error: Unable to fetch site info',
                                url: 'Error: Unable to fetch site info',
                                screenshot: '',
                                dateCreated: '',
                            };
                        }
                    } catch (error) {
                        console.error(`Error fetching site info for site ${siteId}:`, error);
                        return {
                            siteId,
                            name: 'Error: Unable to fetch site info',
                            url: 'Error: Unable to fetch site info',
                            screenshot: '',
                            dateCreated: '',
                        };
                    }
                })
            );

            setSiteInfo(siteData);
        };

        fetchSiteInfo();
    }, []);

    return (
        <div>
            <h2 className='text-center text-2xl py-4 px-6 my-12 bg-gray text-white rounded sm:text-6xl'>Repository</h2>
            <ul className='flex flex-wrap'>
                {siteInfo.map((site) => (
                    <li className='repos-list container mx-auto max-w-3xl mb-20 bg-gray rounded border border-white p-6 shadow-inner' key={site.siteId}>
                        {site.screenshot && <img className='rounded' src={site.screenshot} alt={`Preview of ${site.name}`} />}
                        <div className='details my-4'>
                            <p>Site ID: {site.siteId}</p>
                            <p>Name: {site.name}</p>
                            <a href={site.url} target='_blank' rel="noreferrer" className='prod-url'><p>URL: {site.url}</p></a>
                            <p className='pubDate'>Published date: {site.dateCreated}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;

