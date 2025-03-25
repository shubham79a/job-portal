import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'


// const jobs = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ]


function Jobs() {

    const dispatch = useDispatch();

    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(state => state.job);

    const [filterJobs, setFilterJobs] = useState([]);




    useEffect(() => {

        if (searchedQuery) {
            const filteredJob = allJobs.filter((job) => {
                return job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
                // job?.company.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJob)
            // dispatch(setSearchedQuery(""));


        }
        else {
            setFilterJobs(allJobs)
        }

    }, [allJobs, searchedQuery])


    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
            console.log("trr");

        }
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className='px-[5%] mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />

                    </div>


                    {
                        filterJobs.length <= 0 ? <span>No Jobs Found</span> :
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>

                    }

                </div>



            </div>



            <Footer />
        </>
    )
}

export default Jobs