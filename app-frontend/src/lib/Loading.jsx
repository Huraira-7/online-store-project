import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function Loading() {
  return (
    <div className='flex flex-col overflow-auto'>
                <div className='flex max-[1200px]:flex-col'>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                </div>
                <div className='flex max-[1200px]:hidden'>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                  <div className='text-4xl flex flex-col gap-2 mx-auto w-6/12 max-[1200px]:w-9/12 my-20 '>
                    <div className='flex mx-auto gap-2 w-6/12 max-[1200px]:w-9/12' >
                      <Skeleton animation="wave" variant="circular" width={40} height={40} /> 
                      <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                    </div>
                    <Skeleton sx={{ height: 200 }} className='w-6/12  max-[1200px]:w-9/12  mx-auto rounded-3xl my-4' animation="wave" variant="rectangular" />
                    <Skeleton animation="wave" className='w-6/12 max-[1200px]:w-9/12  mx-auto' height={40} />
                  </div>
                </div>
                </div>
  )
}

export default Loading