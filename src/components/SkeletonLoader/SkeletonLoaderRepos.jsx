import React from 'react'
import Skeleton from '@mui/material/Skeleton';
const SkeletonLoader = () => {
    const numStacks = 3;
    return (
        <div className='flex flex-wrap justify-center items-center gap-20 mb-24 '>
            {Array.from({ length: numStacks }, (_, index) => (
                <Skeleton className='mx-10 rounded' key={index}
                    sx={{ bgcolor: 'grey.600' }}
                    variant="rectangular"
                    width={768}
                    height={618}
                />
            ))}
        </div>
    )
}

export default SkeletonLoader