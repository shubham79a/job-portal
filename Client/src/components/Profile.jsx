import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];


function Profile() {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);

    const resumeHave = true
    return (
        <>
            <Navbar />

            <div className='w-full px-[10%]'>
                <div className=' bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZlaUXIWozu3xqknYB3S9nknCPGFPAEVZLA&s" alt="profile" />

                            </Avatar>
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p className=''>{user?.profile?.bio}</p>
                            </div>

                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                            <Pen />
                        </Button>
                    </div>

                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>


                        <div className='my-5'>
                            <h1>Skills</h1>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {
                                    user?.profile?.skills.length !== 0
                                        ?
                                        user?.profile?.skills.map((item, index) => (
                                            <Badge key={index} >{item}</Badge>
                                        ))
                                        :
                                        <span>NA</span>
                                }
                            </div>
                        </div>

                        <div className='grid w-full items-center gap-1.5'>
                            <Label className="text-md font-bold">Resume</Label>
                            {
                                resumeHave ? <a target='blank' href='https://google.com' className='text-blue-500 w-full hover:underline cursor-pointer'>as</a>
                                    : <span>NA</span>
                            }
                        </div>

                    </div>

                </div>


            </div>

            <div className='bg-white rounded-2xl mx-[10%]'>
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                {/* table */}
                <AppliedJobTable />
            </div>


            {/* update profile */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />




        </>
    )
}

export default Profile;

