import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'

function Header() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignIn(true);
        }
    }, [search]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    };

    return (
        <>
            <nav className='py-2 px-3 sm:py-3 sm:px-6 md:py-4 md:px-12 lg:px-20 flex justify-between items-center'>
                <Link to='/'>
                    <img 
                        src="../logo.png" 
                        alt="logo" 
                        className='h-12 sm:h-14 md:h-16 lg:h-20' 
                    />
                </Link>

                <div className='flex gap-2 sm:gap-3 md:gap-6 lg:gap-8 items-center'>
                    <SignedOut>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowSignIn(true)}
                            className='text-xs sm:text-sm px-3 sm:px-4'
                        >
                            Login
                        </Button>
                    </SignedOut>
                    
                    <SignedIn>
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Link to='/post-job'>
                                <Button 
                                    // variant="destructive" 
                                    className="bg-red-400 text-white hover:bg-red-500 rounded-full text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
                                >
                                    <PenBox size={16} className='mr-1 sm:mr-2 sm:w-5 sm:h-5' />
                                    <span className='hidden sm:inline'>Post a Job</span>
                                    <span className='sm:hidden'>Post</span>
                                </Button>
                            </Link>
                        )}
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                },
                            }}
                        >
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

            {showSignIn && (
                <div 
                    className='fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50'
                    onClick={handleOverlayClick}
                >
                    <div className='w-full max-w-md'>
                        <SignIn
                            signUpForceRedirectUrl="/onboarding"
                            fallbackRedirectUrl="/onboarding"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
