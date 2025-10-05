import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'


function Header() {

   const [showSignIn, setshowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();
    
    const {user} = useUser();

    useEffect(() => {
        if(search.get('sign-in')){
            setshowSignIn(true)
        }
    },[search]);

   const handleOvelayClick = (e)=> {
    if (e.target === e.currentTarget){
        setshowSignIn(false);
        setSearch({});
    }
   };

    return (
        <>
        <nav className='py-4 px-25 flex justify-between items-center'>
            <Link>
            <img src="../logo.png" alt="logo" className='h-20 ' />
            </Link>

            <div className='flex gap-8'>

             <SignedOut>
            <Button variant="outline" onClick={() => setshowSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>
        {/* add a condition only for recrutor */}
        {user?.unsafeMetadata?.role === "recruiter" &&( 
            <Link to='/post-job'>
        <Button variant="destructive" className="rounded-full">
            <PenBox size={20} className='mr-2' />Post a Job</Button>
        </Link>
        )}
        <UserButton appearance={{
            elements:{
                userButtonAvatarBox: "w-0 h-20"
            },
        }}>
            <UserButton.MenuItems>
               <UserButton.Link
               label='My Jobs'
               labelIcon={<BriefcaseBusinessIcon size={15} />}
               href='/my-jobs'
               /> 
               <UserButton.Link
               label='Saved Jobs'
               labelIcon={<Heart size={15} />}
               href='/saved-job'
               /> 
            </UserButton.MenuItems>

        </UserButton>
      </SignedIn>
            </div>
        </nav>

        {showSignIn &&  
            <div className='fixed inset-0 flex items-center justify-center bg-black/50'
            onClick={handleOvelayClick}> 
            <SignIn 
            signUpForceRedirectUrl = "/onboarding"
            fallbackRedirectUrl = "/onboarding"
            />
            </div>}
        </>
    )
}

export default Header
