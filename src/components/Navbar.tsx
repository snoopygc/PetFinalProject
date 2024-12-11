'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/', redirect: true });
    }; 

    return (
        <nav className="bg-primary p-4 shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-background text-2xl font-bold hover:text-highlight transition duration-300">
                        PetPet Diary
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/diary">Diary</NavLink>
                        <NavLink href="/food-calculator">Food Calculator</NavLink>
                        <NavLink href="/activity">Activity</NavLink>
                        <NavLink href="/services">Services</NavLink>
                        {session ? (
                            <>
                                <NavLink href="/member">Profile</NavLink>
                                <button onClick={handleSignOut} className="text-background hover:text-highlight transition duration-300">
                                    Log out
                                </button>
                            </>
                        ) : (
                            <NavLink href="/member/login">Log in</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-background hover:text-highlight transition duration-300">
        {children}
    </Link>
)

export default Navbar

